import React, { Component } from 'react';
import { View, Text, Button, Image, SafeAreaView, Dimensions} from 'react-native';
import { setfromReport, setGlobalState } from '../../Actions/Actions';
import {connect} from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import {Root} from 'native-base';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Item from './Item';
import { API } from '../../Constants/ActionTypes';
import { Surface } from 'react-native-paper';

const mapStateToProps = state =>{
  return{
    token: state.token,
    reports: state.reports,
    isSignedIn: state.LoggedIn
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    setfromReport: (value) => dispatch(setfromReport(value)),
    setGlobalState: (value) => dispatch(setGlobalState(value))
  }
}



class HomeScreen extends Component{

  constructor(props){
    super(props)
    this.state={
      reports: [],
      refreshing: false
    }
  }

  fetchReports = () => {
    this.setState({ refreshing: true })
    fetch(API + '/userhomefetch', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.props.setGlobalState({ reports: data.row })
      })
      .catch(console.log)
    this.setState({ refreshing: false })
  }

  renderItem = ({ item }) => (
    <Item report={ item } />
  )

  render(){
    return (
      <Root>
      <ScrollView>
        <SafeAreaView
          style={ {
            alignItems: 'center'
          } }
        >
          <Surface
            style={ {
              margin: 20,
              flexDirection: 'column',
              width: Dimensions.get('window').width * 0.9,
              backgroundColor: 'white',
              elevation: 9
            } }
          >
            <View
              style={ {
                margin: 10
              } }
            >
              <Image source={ require("../../Images/bribery.jpg") } style={ { height: 200, width: null, marginBottom: 10 } } />
              <Button title='Report' color='rgba(65,63,242,1)' onPress={ async () => {
                const connected = (await NetInfo.fetch()).isConnected;
                if (connected) {
                  if (this.props.isSignedIn) {
                    this.props.navigation.navigate('Report')
                  }
                  else {
                    this.props.setfromReport(true)
                    this.props.navigation.navigate('Login')
                  }
                } else {
                  this.props.navigation.navigate('Report')
                }

              } } />
            </View>
          </Surface>
          {
            this.props.isSignedIn?
            (
              <Surface style={ {
                width: Dimensions.get('window').width * 0.98,
                elevation: 9
              } }>
                <Text style={ { lineHeight: 25, fontSize: 18, fontFamily: 'Roboto', alignSelf: 'flex-start', margin: 8 } }>
                  Some cases where justice was restored:
                </Text>
                  <View style={{alignSelf: 'center'}}>
                    <FlatList
                      onRefresh={ () => this.fetchReports() }
                      refreshing={ this.state.refreshing }
                      data={ this.props.reports }
                      renderItem={ this.renderItem }
                      keyExtractor={ item => item.status_id }
                    />
                  </View>
                </Surface>
            ):null
          }
        </SafeAreaView>
        </ScrollView>
      </Root>
      
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
