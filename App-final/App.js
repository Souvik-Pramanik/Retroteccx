import SplashScreen from 'react-native-splash-screen';
import React, { Component } from 'react';
import DBS from './DBS';
import {Store} from './src/Store/Store';
import {Provider} from 'react-redux';

// BackgroundTask.define(() => {
  // const unsubscribe = NetInfo.addEventListener(state => {
  //     if(state.isConnected){
  // getData().then(m => {
  //     const dta = new FormData();
  //     dta.append('gov_admin', m.gov_and_admin);
  //     dta.append('area_of_gov_admin', m.area_of_gov_and_admin);
  //     dta.append('city', m.city);
  //     dta.append('date', m.date);
  //     dta.append('report', m.report);
  //     dta.append('report_for', m.for);
  //     for (const file of m.files) {
  //         dta.append("files", file);
  //     }

  //     fetch(
  //         'http://192.168.0.102:3000/submitreport',
  //         {
  //             method: 'POST',
  //             headers: {
  //                 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbEBtYWwubWFsIiwiaWF0IjoxNTk2MTI4MDc5LCJleHAiOjE1OTYxMzE2Nzl9.G0pUjqbuDH9kXPQE9fsb_sSbRC3vDr8Kg26hOZSbppQ",
  //                 'Content-Type': 'multipart/form-data'
  //             },
  //             body: dta

  //         }
  //     ).then(res => res.json())
  //     .then(data => {
  //         if(data == 'success'){
  //             // unsubscribe();
  //             BackgroundTask.finish()
  //         }
  //     })
  //     .catch(console.log)
  // })

  // }
  // });
//   console.log('Hello from a background task');
//   BackgroundTask.finish();
// })  

class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
    // BackgroundTask.schedule();
  }
  render() {
    return (
      <Provider store={Store}>
        <DBS/>
      </Provider>
    );
  }
}

export default App;
