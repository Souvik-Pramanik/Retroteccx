import React, { Component }  from 'react';
import {connect} from 'react-redux';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, StatusBar } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { API } from '../../Constants/ActionTypes';
import {Surface, Button, TextInput} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { Toast, Root } from 'native-base';
// import Item from './Item';

const { height, width } = Dimensions.get('window');

const mapStateToProps=state=>{
  return {
    token: state.token
  }
}

const Item = ({ report, onUserFeedback }) => {

  const [visible, setVisible] = React.useState(false);
  const [starCount, setStarCount] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');
  
  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={ { color: 'rgba(88,88,244,1)', marginTop: 5 } } onPress={ handlePress }>
        Read more
      </Text>
    );
  }
  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={ { color: 'rgba(88,88,244,1)', marginTop: 5 } } onPress={ handlePress }>
        Show less
      </Text>
    );
  }

  const toggleDrop = () => setVisible(!visible);

  return (

    <Surface style={ styles.itemContainer }>
      <View style={ styles.itemHeader }>
        <View style={{flexDirection: 'row'}}>
          {/* <Icon name='page-layout-sidebar-right' size={ 24 } color='rgba(244,119,16,1)' /> */}
          <Text style={ {  alignSelf: 'flex-start' } }>Report ID: </Text>
          <Text >{ report.report_id }</Text>
        </View>
        <Text style={{ padding: 10}}>
          Subitted on { report.report_submit_on.slice(0, 10) }
        </Text>
      </View>
      <View style={{padding: 20,
                    borderBottomWidth: 0.2,
                    width: width*0.9,
                    alignItems: 'center'}}>
        <Text>
          {report.gov_admin + " - " + report.area_of_gov_admin}
        </Text>
      </View>
      <View style={ styles.itemBody }>
        <ReadMore numberOfLines={ 2 } renderTruncatedFooter={ _renderTruncatedFooter }
          renderRevealedFooter={ _renderRevealedFooter }>
          <Text style={ { fontSize: 14, lineHeight: 20 } }>
            { report.report_details }
          </Text>
        </ReadMore>
      </View>
      <View style={{flex:1}}>
        {
          (!report.status || report.status.toLowerCase() == 'not reviewed') ?
            (
              <View style={ styles.status }>
                <Text style={ { color: 'red' } }>
                  Your report will be reviewed soon.
                </Text>
              </View>
            )
            :
            (report.status.toLowerCase() == 'closed')
              ?
              (
                <View style={{flex: 1}}>
                <View style={ styles.status}>
                    <Text style={ { color: 'red' } }>
                      Your report has been closed.
                    </Text>
                </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <StarRating
                      disabled={ false }
                      emptyStar={ 'star-border' }
                      fullStar={ 'star' }
                      halfStar={ 'star-half' }
                      iconSet={ 'MaterialIcons' }
                      maxStars={ 5 }
                      rating={ starCount }
                      selectedStar={ (rating) => setStarCount(rating) }
                      fullStarColor={ 'rgba(147,12,178,1)' }
                    />
                    <Text>
                      How much satisfied are you with the solution?
                    </Text>   
                  </View>
                  <TextInput
                    multiline={ true }
                    mode='outlined'
                    style={{marginTop: 10}}
                    placeholder='Please give your valuable feedback'
                    maxLength={ 1000 }
                    value={ feedback }
                    selectionColor='rgba(90,174,223,0.5)'
                    onChangeText={ txt => setFeedback(txt) }
                  />
                  <Button
                    mode="contained"
                    onPress={ () => onUserFeedback(report.report_id,starCount, feedback) }
                    style={ { padding: 3, margin: 10, backgroundColor: 'rgba(147,12,178,1)' } }>
                    Send
                    </Button>
                </View>

              )
              :
              (
                <View>
                  <View style={ styles.status }>
                    <Text style={ { color: 'rgba(232,221,23,1)' } }>
                      Your report is under process.
                    </Text>
                  </View>
                  <View>
                    <Button mode="text" onPress={ toggleDrop } style={ { padding: 3 } }>
                      { visible ? "Hide" : "Details" }
                    </Button>
                  </View>
                </View>
              )
        }
        
      </View>
      <View>
        {
          (visible)?
            (
              <View style={{width: width*0.9}}>
                <Text style={ { padding: 10, lineHeight: 20, fontSize: 14}}>
                  { "Your report was last reviewed by " + report.name + " on " + report.created_at.slice(0,10) }
                </Text>
                <View>
                  <Text style={{fontSize: 16}}>
                    Admin Feedback:
                  </Text>
                  <Text style={ { padding: 10, lineHeight: 20 } }>
                    { report.status_feedback }
                  </Text>
                </View>
              </View>
            ) : null
        }
      </View>
    </Surface>

  );
}

class MyReportScreen extends Component{

  constructor(props){
    super(props);
    this.state={
      reports: [],
      refreshing: true
    }
  }

  fetchReports = ()=>{
    this.setState({refreshing: true})
    fetch(API + '/userfetch', {
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
        this.setState({ reports: data.row })
      })
      .catch(console.log)
      this.setState({refreshing: false})
  }

  componentDidMount = ()=>{
    this.fetchReports();
  }

  onUserFeedback = (id,count, txt)=>{
    fetch(API+'/userfeedback', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        rate: count,
        feedback: txt
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data == 'success'){
        Toast.show({
          text: "Thank you!",
          duration: 3000
        })
      }
    })
    .catch(console.log)
  }


  renderItem = ({item}) => (
    <Item report={ item } onUserFeedback={ this.onUserFeedback }/>
  );
  render(){
    if(this.state.refreshing || this.state.reports.length == 0)
      return(
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'rgba(225,212,26,1)',
        }}>
          <Icon name='alert-circle-outline' size={ 100 } color='rgba(249,248,233,1)' />
          <Text
            style={ { color: 'rgba(249,248,233,1)', fontSize: 20}}>
            You have not submitted any reports yet.
          </Text>
        </View>
      )
    else
      return (
        <Root>
          <SafeAreaView style={ styles.container }>
            <FlatList
              onRefresh={ () => this.fetchReports() }
              refreshing={ this.state.refreshing }
              data={ this.state.reports }
              renderItem={ this.renderItem }
              keyExtractor={ item => item.report_id }
            />
          </SafeAreaView>
        </Root>
      );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width: width * 0.95,
    elevation: 9,
    flexDirection: 'column',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width*0.9,
    paddingBottom: 10,
    borderBottomWidth: 0.4,
  },
  itemBody: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingBottom:20,
    borderBottomWidth: 0.4,
    width: width*0.9
  },
  status: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userfeedback: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 0.4
  }
});

export default connect(mapStateToProps)(MyReportScreen);
