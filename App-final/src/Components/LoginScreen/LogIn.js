import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, TextInput } from "react-native-paper";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Toast, Root} from 'native-base';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';

import { setGlobalState, setfromReport } from '../../Actions/Actions';
import fetch from '../../API/Fetch';
import { API } from "../../Constants/ActionTypes";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const mapStateToProps = state => {
    return {
        fromReport: state.fromReport
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGlobalState: (info) => dispatch(setGlobalState(info)),
        setFromReport: (value)=> dispatch(setfromReport(value))
    }
}

const makeFormData = async (m)=>{
    return new Promise((resolve, reject) => {
        const dta = new FormData();
        dta.append('gov_admin', m.gov_and_admin);
        dta.append('area_of_gov_admin', m.area_of_gov_and_admin);
        dta.append('city', m.city);
        dta.append('date', m.date);
        dta.append('report', m.report);
        dta.append('report_for', m.for);
        for (const file of m.files) {
            dta.append("files", file);
        }
        resolve(dta)
    })
    
}

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please a valid correct email adddress')
        .required(),
    password: yup
        .string()
        .min(8)
        .max(32)
        .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {message: 'Password must have at least 8 charactes, 1 letter, 1 number and 1 special character', excludeEmptyString: true})
        .required()
})

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@report')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        alert(e)
    }
}

// const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length);

class LogIn extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            securetext: true,
            loading: false,
            m: {},
        };
        setTimeout(() => {
            this.props.setFromReport(false)
        }, 5000);
    };

    submitPrevReport = async (token)=>{

        try {
            if (this.state.m) {
                const dta = await makeFormData(this.state.m)
                const res = await fetch(API+'/submitreport',
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'multipart/form-data'
                        },
                        body: dta
                    })
                
                const data = await res.json()
                console.log(data)
                if (data == 'success') {

                    setTimeout(() => {
                        Toast.show({
                            text: "I just submitted your stored report!",
                            buttonText: "Okay",
                            duration: 3000
                        });
                    }, 5000);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    fetchReports = (token) => {
        fetch(API + '/userhomefetch', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                this.props.setGlobalState({ reports: data.row })
            })
            .catch(console.log)
    }
    
    authUser(values){
        NetInfo.fetch().then((c) => {
            if (!c.isConnected) {
                Toast.show({
                    text: "Please check your internet connection.",
                    buttonText: "Okay",
                    duration: 3000
                });

            }
            else{
                this.setState({ loading: true });
                fetch("https://aqueous-tor-11299.herokuapp.com/signin", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password
                    })
                })
                    .then((res) => res.json())
                    .then(data => {
                        this.setState({ loading: false });
                        switch (data.status) {
                            case 'success':
                                this.props.setGlobalState({
                                    token: data.token,
                                    UserName: data.username,
                                    email: values.email,
                                    LoggedIn: true
                                })
                                this.submitPrevReport(data.token);
                                this.fetchReports(data.token)
                                this.props.goBack();
                                break;
                            case 'failed':
                                Toast.show({
                                    text: "Login falied.",
                                    buttonText: "Okay",
                                    duration: 3000
                                });
                                break;
                            case 'wrong cred':
                                Toast.show({
                                    text: "Please check your Email and Password.",
                                    buttonText: "Okay",
                                    duration: 3000
                                });
                                break;
                            default:
                                Toast.show({
                                    text: "Login falied!",
                                    buttonText: "Okay",
                                    duration: 3000
                                });
                                break;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({ loading: false });
                        Toast.show({
                            text: "Request timed out. Please try again after few minutes.",
                            buttonText: "Okay",
                            duration: 3000
                        });
                    })
            }
        });
    }

    componentDidMount(){
        getData().then(m=>this.setState({m: m}))
    }
  
    render() {
      
    return (
        <Root>
            <View style={ [style.container]}>
                <LinearGradient
                    colors={ ['#FF9933', '#FFFFFF', '#138808'] }
                    style={ style.linearGradient }>          
                    <KeyboardAvoidingView
                        behavior={ Platform.OS == "ios" ? "padding" : "position" }
                        style={ {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center'
                        } }>         
                        <ScrollView contentContainerStyle={ style.scrollview } showsVerticalScrollIndicator={ false }>
                            <View
                                style={ {

                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 30,
                                } }>
                                <Image source={ require('../../Images/BPRD-bkg.png') } style={ style.logo } />
                                {
                                    (this.props.fromReport) ?
                                        (
                                            <Text style={ { color: 'red', alignSelf: 'flex-start', marginTop: 15, marginLeft: 10 } }>
                                                You must logged in before reporting
                                            </Text>
                                        ) : (<></>)
                                }
                                <Formik
                                    initialValues={ {
                                        email: '',
                                        password: '',
                                    } }
                                    onSubmit={ values => this.authUser(values) }
                                    // validationSchema={ validationSchema }
                                    >

                                    { ({ handleChange, handleBlur, handleSubmit, values, errors, setFieldTouched, touched=false, isValid, }) => (
                                        <View style={ style.container }>
                                            <TextInput
                                                style={ style.input }
                                                autoFocus={ true }
                                                inlineImageLeft='email'
                                                inlineImagePadding={ 20 }
                                                placeholder='Email...'
                                                placeholderTextColor='#7B7470'
                                                // onBlur={()=>this.checkRegistered()}
                                                onChangeText={handleChange('email') }
                                                onBlur={handleBlur('email') }
                                                value={ values.email }
                                            />
                                            { touched.email && errors.email &&
                                                <Text style={ { fontSize: 12, color: 'red', alignSelf: 'flex-start' } }>{ errors.email }</Text>
                                            }
                                            <TextInput
                                                style={ style.input }
                                                inlineImageLeft='password'
                                                inlineImagePadding={ 20 }
                                                placeholder='Password...'
                                                placeholderTextColor='#7B7470'
                                                // onFocus={ () => this.checkRegistered() }
                                                onChangeText={ handleChange('password') }
                                                onBlur={ handleBlur('password') }
                                                value={ values.password }
                                                clearTextOnFocus={ true }
                                                secureTextEntry= {this.state.securetext}
                                            />
                                            { touched.password && errors.password &&
                                                <Text style={ { fontSize: 12, color: 'red', alignSelf: 'flex-start'  } }>{ errors.password }</Text>
                                            }
                                            
                                            <Button
                                                icon='login'
                                                contentStyle={ {
                                                    height: 50,
                                                    width: windowWidth * 0.7,
                                                    backgroundColor: (isValid) ? 'rgba(50,8,243,0.8)' : 'rgba(108,108,121,1)'
                                                } }
                                                style={ { marginTop: 20 } }
                                                labelStyle={ {
                                                    color: 'white'
                                                } }
                                                loading={this.state.loading}
                                                disabled={ !isValid }
                                                onPress={ handleSubmit }>
                                                Log in
                                                </Button>
                                            <Text style={{
                                                fontSize: 16,
                                                color: 'rgba(27,27,47,1)',
                                                padding: 5, 
                                                marginTop: 10,
                                                alignSelf:'flex-start',}} 
                                                onPress={()=>{
                                                    this.props.setGlobalState({email: values.email})
                                                    this.props.navigation.navigate('Register')
                                                }}
                                                >
                                                Don't have an accout? Sign up!
                                            </Text>
                                        </View>
                                    ) }
                                </Formik>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView> 
                </LinearGradient>
            </View >
        </Root>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        height: 40,
        backgroundColor: 'transparent',
        width: windowWidth * 0.8,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        margin: 10
    },
    scrollview: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        height: windowHeight,
        width: windowWidth,
    },
    logo: {
        height: 210,
        width: 210,
        resizeMode: "stretch",
        padding: 30,
        marginVertical: 10,
    }
})
