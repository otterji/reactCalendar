import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
//
import Loading from './Loading';
import Main from './Main';
import LoginPage from './components/Accounts/LoginPage';
import SignupPage from './components/Accounts/SignupPage';
import MoreInfo from './components/Accounts/MoreInfo';
import Visit from './components/Visit/Visit';
import ServicePage from './components/ServicePage/ServicePage';
import UpdateUserInfo from './components/UserInfo/UpdateUserInfo/UpdateUserInfo';

interface State {
  isLogin: boolean;
  isChannel: boolean;
  actions: {
    onLogin: () => void;
    // onLogout: (string:string) => void,
  };
}
export const contextStorage = React.createContext<Partial<State>>({});
class App extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: this.isLogin(),
      isChannel: this.isChannel(),
      actions: {
        onLogin: this.onLogin
        // onLogout: this.onLogout,
      }
    };
  }
  componentDidMount() {
    console.log('did mount APP')
  }
  componentDidUpdate() {
    console.log('did update APP')
  }
  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  isLogin = (): boolean => {
    const _id = window.sessionStorage.getItem('id');
    const _jwt = window.sessionStorage.getItem('jwt');
    if (_id && _jwt) {
      return true;
    }
    sessionStorage.clear();
    return false;
  };
  isChannel = (): boolean => {
    const _isChannel = window.sessionStorage.getItem('isChannel');
    if (_isChannel === 'channel') {
      return true;
    }
    return false;
  };

  onLogin = async () => {
    sessionStorage.setItem('mode', 'home');
    await this.setStateAsync({
      isLogin: this.isLogin(),
      isChannel: this.isChannel()
    });
  };

  render() {
    return (
      <div className="app">
        <contextStorage.Provider value={this.state}>
          <Route exact path="/" component={Loading} />
          <Route path="/mainPage" component={Main} />
          <Route path="/VisitPage/:chName" component={Visit} />
          <Route path="/loginPage" component={LoginPage} />
          <Route path="/signupPage" component={SignupPage} />
          <Route path="/moreInfoPage" component={MoreInfo} />
          <Route path="/ServicePage" component={ServicePage} />
          <Route path="/updateUserInfo" component={UpdateUserInfo} />
        </contextStorage.Provider>
      </div>
    );
  }
}
export default withRouter(App);
