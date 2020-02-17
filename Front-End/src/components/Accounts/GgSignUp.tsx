import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

class GgSignUp extends Component<any> {
    responseGoogle = (res: any) => {
        console.log(res);
        sessionStorage.setItem('jwt', res.accessToken);
        sessionStorage.setItem('id', res.profileObj.email);
        sessionStorage.setItem('pw', '2222');
        this.props.history.push('/moreInfoPage');
    }

    responseFail = (err: any) => {
        console.error(err);
    }


    render() {
        return (
            <StGgLogin>
                <GoogleLogin
                    clientId="44884700400-kd6hmt2cbq7a2kg4274lpqfa375ms3e0.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseFail}
                />
            </StGgLogin>
        )
    }
}
const StGgLogin = styled.div`
    display: flex;
    flex-flow: column wrap;
`;
export default withRouter(GgSignUp);