import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loading from './Loading';
import Main from './Main';
import LoginPage from './components/Accounts/LoginPage';
import SignupPage from './components/Accounts/SignupPage';
import MoreInfo from './components/Accounts/MoreInfo';
interface State {
  isLogin: boolean,
  isChannel: boolean,
  actions: {
    onLogin: () => void,
    onLogout: () => void,
  },
}
export const loginState = React.createContext<Partial<State>>({});
class App extends Component<any, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: this.isLogin(),
      isChannel: this.isChannel(),
      actions: {
        onLogin: this.onLogin,
        onLogout: this.onLogout,
      },
    }
  }
  componentDidMount() {
    // console.log('app did mount')
  }
  componentDidUpdate() {
    // console.log('app did update')
  }
  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  isLogin = (): boolean => {
    const _id = window.sessionStorage.getItem('id');
    if (_id) {
      return true;
    }
    return false;
  }
  isChannel = (): boolean => {
    const _isChannel = window.sessionStorage.getItem('isChannel');
    if (_isChannel) {
      return true;
    }
    return false;
  }

  onLogin = async () => {
    await this.setStateAsync({
      isLogin: this.isLogin(),
      isChannel: this.isChannel(),
    });
  }
  onLogout = async () => {
    let _confirm = window.confirm('로그아웃 하시겠습니까?');
    if (_confirm) {
      sessionStorage.clear();
      window.location.href = '/mainPage';
      await this.setStateAsync({
        isLogin: this.isLogin(),
        isChannel: this.isChannel(),
      });
    }
  }
  render() {
    return (
      <div className="app">
        <loginState.Provider value={this.state}>
          <Route exact path="/" component={Loading} />
          <Switch>
            <Route path="/mainPage" component={Main} />
          </Switch>
          <Route path="/loginPage" component={LoginPage} />
          <Route path="/signupPage" component={SignupPage} />
          <Route path="/moreInfoPage" component={MoreInfo} />
        </loginState.Provider>
      </div>
    )
  }
}
export default withRouter(App);
