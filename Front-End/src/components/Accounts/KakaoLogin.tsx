import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
declare const window: any;
class KakaoLogin extends Component<any> {
    loginWithKakao = () => {
        window.Kakao.init('048f1536eb1eb083312cde91cbcc3a6c')
        window.Kakao.Auth.login({
            success: (authObj: any) => {
                // console.log(authObj.access_token);
                sessionStorage.setItem('jwt', authObj.access_token);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: (res: any) => {
                        console.log(JSON.stringify(res));
                        sessionStorage.setItem('id', res.kakao_account.email);
                        sessionStorage.setItem('pw', '1111');
                        this.props.onLogin();
                        this.props.history.push('/mainPage');
                    },
                    fail: function (error: any) {
                        alert(JSON.stringify(error));
                    }
                });
            },
            fail: function (err: any) {
                alert("카카오 로그 실패");
            }
        });
    }
    render() {
        return (
            <StGgLogin>
                <img src='/images/kakao_account_login_btn_medium_narrow.png' onClick={this.loginWithKakao}/>
            </StGgLogin>
        );
    }
}
const StGgLogin = styled.div`
    display: flex;
    flex-flow: column wrap;
    cursor: pointer;
`;
export default withRouter(KakaoLogin);