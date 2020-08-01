import React, { Component } from 'react';
import './App.css';
import Signin from './components/Signin';
import Register from './components/Register';
import Home from './components/Home';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      admin_id: null,
      route: 'signin',
      token: ''
    }
  }

  goTo = (route)=>{
    this.setState({route: route})
  }

  setstate = (obj) => {
      this.setState(obj);
  }

  render(){
    if(this.state.route === 'signin'){
      return <Signin setState={ this.setstate } goTo={ this.goTo } />
    }
    else if(this.state.route === 'register'){
      return <Register goTo={this.goTo}/>
    }
    else
      return (
        <div class="App">
          <Home goTo={ this.goTo } setState={ this.setstate } token={this.state.token} admin_id={this.state.admin_id}/>
        </div>
      );
  }
}

export default App;
