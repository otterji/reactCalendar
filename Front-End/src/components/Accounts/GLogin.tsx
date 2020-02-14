import GoogleLogin from "react-google-login";
import React, {Component} from "react";
import styled from "styled-components";

class GLogin extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
        }
    }

    responseGoogle = (res: any) => {
        console.log(res);
        this.setState({
            id: res.googleId,
            name: res.profileObj.name,
            provider: 'google'
        })
    }

    responseFail = (err: any) => {
        console.error(err);
    }

    render() {
        return (
            <Container>
                <GoogleLogin
                    clientId="44884700400 - kd6hmt2cbq7a2kg4274lpqfa375ms3e0.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseFail}
                />
            </Container>
        );
    }
}

const Container = styled.div`
    diplay: flex;
    flex-flow: column wrap;
  `

export default GLogin;