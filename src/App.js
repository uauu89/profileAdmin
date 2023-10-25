import { Component } from 'react';
import cookie from 'react-cookies';
import './css/Common.css';
import Login from './component/Login';
import Main from './component/Main';

export default class App extends Component{

  state = {
    loginStatus : false,
  }

  Login = (result)=>{
    this.setState({loginStatus : result});
  }

  LogOut = ()=>{
    cookie.remove("0", {path : "/"});
    cookie.remove("1", {path : "/"});
    this.forceUpdate();
  }

  sessionConfirm = async () => {
    let data = {
      token1 : cookie.load("0"),
      token2 : cookie.load("1"),
    }
    let result;

    await fetch("http://101.101.211.45:8000/adminSession",{
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(res=>result = res);
    return result;
  }

  render(){
    return(
      <>
        {!cookie.load(0) ?
            <Login Login={this.Login}/> :
            <Main 
              loginStatus={this.state.loginStatus}
              sessionConfirm = {this.sessionConfirm}
              LogOut = {this.LogOut}
            />
        }
      </>
    )
  }
}