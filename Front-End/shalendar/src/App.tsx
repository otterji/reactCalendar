import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './Main';
import LoginPage from './components/Accounts/Login/LoginPage';
import SignupPage from './components/Accounts/Signup/SignupPage';

interface State {
  isLogin:boolean,
  actions:{
    onLogin:()=>void,
    onLogout:()=>void,
  }
}

export const loginState = React.createContext<Partial<State>>({});

class App extends Component<any, State>{
  constructor(props:any){
    super(props);
    this.state = {
      isLogin: false,
      actions:{
        onLogin: this.onLogin,
        onLogout: this.onLogout,
      }
    }
  }

  onLogin = () => {
    this.setState({isLogin:true});
  }
  onLogout = () => {
    this.setState({isLogin:false});
  }

  render(){
    return(
      <div className="app">
        <loginState.Provider value={this.state}>
          <Switch>
            {/* <Route exact path="/"><Main isLogin={this.state.isLogin} _login={this._login}/></Route>
            <Route path="/loginPage"><LoginPage _login={this._login}/></Route>
            <Route path="/signupPage"><SignupPage _login={this._login}/></Route> */}

            <Route exact path="/" component={Main}/>
            <Route path="/loginPage" component={LoginPage}/>
            <Route path="/signupPage" component={SignupPage}/>
          </Switch>
        </loginState.Provider>
      </div>
    )
  }
}

export default App;