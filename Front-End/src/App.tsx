import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loading from './Loading';
import Main from './Main';
import LoginPage from './components/Accounts/LoginPage';
import SignupPage from './components/Accounts/SignupPage';
import MoreInfo from './components/Accounts/MoreInfo';

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

  componentDidMount(){
    const _id = window.sessionStorage.getItem('id');
    if(_id){
      this.onLogin();
    }
  }

  onLogin = () => {
    this.setState({isLogin:true});
  }
  onLogout = () => {
    let _confirm = window.confirm('로그아웃 하시겠습니까?');
    if(_confirm){
      sessionStorage.clear();
      this.setState({isLogin:false});
      this.props.history.push('/mainPage')
    }
  }

  render(){
    return(
      <div className="app">
        <loginState.Provider value={this.state}>
          <Route exact path="/" component={Loading}/>

          <Switch>
            <Route path="/mainPage" component={Main}/>
          </Switch>
          
          <Route path="/loginPage" component={LoginPage}/>
          <Route path="/signupPage" component={SignupPage}/>
          <Route path="/moreInfoPage" component={MoreInfo}/>
        </loginState.Provider>
      </div>
    )
  }
}

export default withRouter(App);

