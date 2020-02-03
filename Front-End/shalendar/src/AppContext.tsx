import {createContext} from 'react';

interface loginState {
    isLogin:boolean,
    onLogin:() => void,
    onLogout:() => void,
}

const AppContext = createContext<Partial<loginState>>({});
export default AppContext;