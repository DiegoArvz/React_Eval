import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';
import Login from './components/Login/Login'
import Home from './components/Home/home';
import axios from './axios-orders'

import {Switch, Link, Route, BrowserRouter} from 'react-router-dom'


import Checkout from './components/Checkout/Checkout'

class App extends Component {
  state = {
    user: "",
    password: "",
    logged: false,
    products: ""
  }


  setUser = (userLog, loggedLog, productsLog)=>{
    this.setState({
      user: userLog,
      logged: loggedLog,
      products: productsLog
    })

    console.log(this.state);
    if(this.state.logged){
        this.history.push({pathname: '/home'})
    }
  }





  render() {
    return (
      <div className="App">

      { <Switch>
        <Route  exact path="/"
                render={(props)=><Login  {...props}
                         logHandler={this.setUser}
                        />} 
        />
        <Route  path="/home" component={Home} />        
      </Switch>}
      {/* <Home ></Home>*/}
        
      </div>
    );
  }
}

export default App;
