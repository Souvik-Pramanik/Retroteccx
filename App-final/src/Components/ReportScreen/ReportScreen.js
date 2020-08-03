import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions, Platform, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, IconButton, RadioButton, Button } from "react-native-paper";
import DocumentPicker from 'react-native-document-picker';
import {Toast, Root, DatePicker} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";


import {GovAndAdminList} from '../../Lists/GovAndAdminList';
import { AreaOfGovAndAdmin } from '../../Lists/AreaOfGovAndAdmin';
import  CityList  from '../../Lists/CityList';
import { API } from "../../Constants/ActionTypes";

const windowWidth = Dimensions.get('window').width;
var renderFiles = [];

const mapStateToProps = (state) => {
    return {
        email: state.email,
        token: state.token
    }
}

// BackgroundTask.define(() => {
//     // const unsubscribe = NetInfo.addEventListener(state => {
//     //     if(state.isConnected){
//             // getData().then(m => {
//             //     const dta = new FormData();
//             //     dta.append('gov_admin', m.gov_and_admin);
//             //     dta.append('area_of_gov_admin', m.area_of_gov_and_admin);
//             //     dta.append('city', m.city);
//             //     dta.append('date', m.date);
//             //     dta.append('report', m.report);
//             //     dta.append('report_for', m.for);
//             //     for (const file of m.files) {
//             //         dta.append("files", file);
//             //     }

//             //     fetch(
//             //         'http://192.168.0.102:3000/submitreport',
//             //         {
//             //             method: 'POST',
//             //             headers: {
//             //                 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbEBtYWwubWFsIiwiaWF0IjoxNTk2MTI4MDc5LCJleHAiOjE1OTYxMzE2Nzl9.G0pUjqbuDH9kXPQE9fsb_sSbRC3vDr8Kg26hOZSbppQ",
//             //                 'Content-Type': 'multipart/form-data'
//             //             },
//             //             body: dta

//             //         }
//             //     ).then(res => res.json())
//             //     .then(data => {
//             //         if(data == 'success'){
//             //             // unsubscribe();
//             //             BackgroundTask.finish()
//             //         }
//             //     })
//             //     .catch(console.log)
//             // })

//         // }
//     // });
//     console.log('Hello from a background task');
//     BackgroundTask.finish();
// })

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@report', jsonValue)
        console.log("1",jsonValue)
    } catch (e) {
        alert(e)
    }
}

class ReportScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            token: this.props.token,
            gov_and_admin: '',
            area_of_gov_and_admin: '',
            city: '',
            date: '',
            report: '',
            for: 'self',
            files: [],
            email: this.props.email,
            valid: false,
            loading: false
        }
        
    }

    GetCity(city){
        this.setState({city: city});
    }

    isValid(){
        if (this.state.gov_and_admin != ''
            && this.state.area_of_gov_and_admin != ''
            && this.state.city != ''
            && this.state.date != ''
            && this.state.report != ''
            && this.state.for != '')
            this.state.valid = true;
        else this.state.valid = false;
    }

    submitReport = async () => {
        try {
            const connected = (await NetInfo.fetch()).isConnected;
            const data = new FormData();
            data.append('gov_admin', this.state.gov_and_admin);
            data.append('area_of_gov_admin', this.state.area_of_gov_and_admin);
            data.append('city', this.state.city);
            data.append('date', this.state.date);
            data.append('report', this.state.report);
            data.append('report_for', this.state.for);
            for (const file of this.state.files) {
                data.append("files",file);
            }
            console.log("1",data)
            if(!connected){
                Toast.show({
                    text: "Hmm... Looks like there are internet issues. I have saved you report and will upload it once you sign in",
                    buttonText: "Okay",
                    duration: 8000
                })
                storeData(this.state);
                // BackgroundTask.schedule()

            }
            else{
                this.setState({loading: true})
                let res = await fetch(
                    API+'/submitreport',
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer '+this.props.token,
                            'Content-Type': 'multipart/form-data'
                        },
                        body: data  
                    }
                );
                let responseJson = await res.json();
                console.log(responseJson);
                this.setState({ loading: false });
                if(responseJson == 'success'){
                    Toast.show({
                        text: "Your report was submitted successfully!",
                        buttonText: "Thank you",
                        duration: 3000
                    })
                    setTimeout(() => {
                        renderFiles=[];
                        this.props.navigation.pop()
                    }, 3000);
            
                }
                else{
                    Toast.show({
                        text: "There was a problem submitting your report. Please try again!",
                        buttonText: "Okay",
                        duration: 3000
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    } 

    selectMultipleFile = async () => {
        try {
            var results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            if(results.length>3) {
                Toast.show({
                text: "More than 3 files were selected, Only the first 3 will be uploaded!",
                buttonText: "Okay",
                duration: 3000
                })
                results = results.slice(0,3);
            }
            
            for (const res of results) {
                if(res.size > 50000000){
                    Toast.show({
                        text: "Maximum file size is 50Mb",
                        buttonText: "Okay",
                        duration: 3000
                    })
                    continue;
                }
                renderFiles.push(
                  <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: windowWidth*0.9}}>
                      <View style={{flex: 2}}>
                            <Text style={ {
                                fontSize: 12,
                                color: "rgba(32,124,196,1)",
                                alignSelf: 'flex-start'
                            } }>
                                Name: { res.name }
                            </Text>
                      </View>
                      <View style={{flex: 1}}>
                            <Text style={ {

                                fontSize: 12,
                                color: "rgba(32,124,196,1)",
                                alignSelf: 'flex-start'
                            } }>
                                Size: { res.size/1000 }kb
                            </Text>
                      </View>
                  </View>
                )
            }
        
            this.setState({ files: results });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('No files were slected');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    render(){     
        this.isValid();
        return (
            <Root>
            <View style={ styles.container }>
                <KeyboardAvoidingView 
                    behavior={ Platform.OS == "ios" ? "padding" : "heigth" }
                    style={ styles.container }>
                    <ScrollView 
                        contentContainerStyle={ styles.scrollview }  
                        showsVerticalScrollIndicator={false}
                        scrollsToTop = {Platform.OS == 'ios' ? true : false}
                    >


                        <DropDownPicker
                            items={ GovAndAdminList }
                            containerStyle={ styles.pickercontainer }
                            style={ { backgroundColor: '#fafafa' } }
                            itemStyle={ {
                                justifyContent: 'flex-start'
                            } }
                            dropDownStyle={ { backgroundColor: '#fafafa' } }
                            onChangeItem={ item => {
                                this.setState({gov_and_admin: item['label']})
                            }}
                            searchable={ true }
                            searchablePlaceholder="Search with a keyword..."
                            searchablePlaceholderTextColor="gray"
                            searchableError={ () => <Text>Not Found</Text> }
                            placeholder='Which Governance & Administration Was It?'
                        />


                        <DropDownPicker
                            items={ AreaOfGovAndAdmin(this.state.gov_and_admin) }

                            containerStyle={ styles.pickercontainer }
                            style={ { backgroundColor: '#fafafa' } }
                            itemStyle={ {
                                justifyContent: 'flex-start'
                            } }
                            dropDownStyle={ { backgroundColor: '#fafafa' } }
                            onChangeItem={ item => {
                                this.setState({
                                    area_of_gov_and_admin: item['label']
                                })
                                
                            }}
                            searchable={ true }
                            searchablePlaceholder="Search with a keyword..."
                            searchablePlaceholderTextColor="gray"

                            searchableError={ () => <Text>Not Found</Text> }
                            placeholder='Which Area of Governance & Administration Was It?'
                        />




                        <View style={{zIndex: 2, marginTop: 10}}>
                            <CityList onSelect={ this.GetCity.bind(this) } value={this.state.city} />
                        </View>
                        

                        <View style={styles.datepicker}>
                            <DatePicker
                                defaultDate={ new Date() }
                                minimumDate={ new Date(1900, 1, 1) }
                                maximumDate={ new Date() }
                                locale={ "en" }
                                timeZoneOffsetInMinutes={ undefined }
                                modalTransparent={ false }
                                animationType={ 'fade' }
                                androidMode={ "default" }
                                placeHolderText="Select date of the incident"
                                textStyle={ { color: "green" } }
                                placeHolderTextStyle={ { color: "rgba(34,124,196,1)" } }
                                onDateChange={ (date) => this.setState({ date: date.toString() }) }
                                disabled={ false }
                            />
                        </View>


                        <View style={styles.reportContainer}>
                            <Text style={styles.caption}>
                                Enter report details along with Date, Time & Location of the incident; Name & Designation of the officer.                                
                            </Text>
                            <TextInput
                                multiline={true}
                                style={styles.reportInput}
                                mode='outlined'
                                placeholder='Within 5000 characters...'
                                maxLength={1000}
                                selectionColor='rgba(90,174,223,0.5)'
                                onChangeText={(txt=>this.setState({report: txt}))}
                            />
                        </View>


                        <View style={styles.attach}>
                            <Text style={ { color: "red", fontSize: 12 } }>*maximum 3 files</Text>
                            <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                                <Text style={ {flex: 7, fontSize: 16 } }>Attach files as evidence if any</Text>
                                <IconButton
                                    icon="attachment"
                                    color='rgba(34,124,196,1)'
                                    style={ {
                                        flex: 1,
                                        alignSelf: 'flex-end'
                                    } }
                                    size={ 30 }
                                    onPress={ this.selectMultipleFile.bind(this) }
                                />
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                }}>
                                { (this.state.files.length > 0) ?
                                    (renderFiles)
                                    :
                                    (null)
                                }
                            </View>
                        </View>


                        <View style={ styles.option }>
                            <RadioButton.Group onValueChange={ value => this.setState({for: value}) } value={ this.state.for }>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <RadioButton value="self" />
                                    <Text>Reporting as a victim</Text>  
                                </View>
                                <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                                    <RadioButton value="other"/>                              
                                    <Text>Reporting as a witness</Text>
                                </View>
                            </RadioButton.Group>
                        </View>


                        <Button
                            mode="contained"
                            loading = {this.state.loading}
                            contentStyle={ {
                                height: 50,
                                width: windowWidth * 0.7,
                                backgroundColor: (this.state.valid) ? 'rgba(50,8,243,0.8)' : 'rgba(108,108,121,1)'
                            } }
                            disabled = {!this.state.valid}
                            onPress={ () => this.submitReport() }>
                            Submit Report
                        </Button>

                        <View style={{padding: 20}}/>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            </Root>
        );
    }
}

export default connect(mapStateToProps)(ReportScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollview: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    pickercontainer: {
        margin: 10,
        height: 40, 
        width: windowWidth * 0.9,
        marginBottom: 20,
    },
    reportContainer: {
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        marginTop: 20,
        borderBottomWidth: 0.4,
        paddingBottom: 20,
        width: windowWidth * 0.9,
    },
    caption: {
        marginLeft: 10,
        fontSize: 16,
        paddingBottom: 5,
    },
    reportInput: {
        width: windowWidth*0.9,
    },
    attach: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: windowWidth * 0.9,
        margin: 10,
        borderBottomWidth: 0.4,
        paddingBottom: 10,
    },
    option: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: windowWidth * 0.9,
        margin: 10,
        paddingBottom: 20,
        borderBottomWidth: 0.4
    },

    datepicker: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: windowWidth * 0.9,
        margin: 7,
        paddingVertical: 10,
        borderBottomWidth: 0.4,
    }

})
