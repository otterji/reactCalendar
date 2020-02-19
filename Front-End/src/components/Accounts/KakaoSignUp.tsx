import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { url as _url } from '../../url';
import axios from 'axios';

declare const window: any;
interface State {
    data: any;
}
class KakaoSignUp extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: 'kakao'
        }
    }

    loginWithKakao = () => {
        window.Kakao.init('048f1536eb1eb083312cde91cbcc3a6c')
        window.Kakao.Auth.login({
            success: (authObj: any) => {
                // console.log(authObj.access_token);
                sessionStorage.setItem('jwt', authObj.access_token);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: (res: any) => {
                        // console.log(JSON.stringify(res));
                        sessionStorage.setItem('id', res.kakao_account.email);
                        sessionStorage.setItem('pw', '1111');

                        try {
                            const isExist = async () => {
                                console.log('들어왔다')
                                const ress = await axios({
                                    method: "get",
                                    url: `${_url}/member/isExist/${res.kakao_account.email}`,
                                    responseType: "json"
                                });
                                if (ress.data.state === "SUCCESS") {
                                    console.log('성공하면 안되는데 성공했다^^')
                                    sessionStorage.setItem("id", res.kakao_account.email);
                                    sessionStorage.setItem("pw", '1111');
                                    sessionStorage.setItem('jwt', res.accessToken);
                                    this.props.history.push("/moreInfoPage");
                                } else if (ress.data.state === "FAIL") {
                                    console.log('실패했다^^')
                                    sessionStorage.clear();
                                    alert("이미 존재하는 계정 입니다");
                                }
                                return ress
                            }
                            isExist().then(() => {
                                console.log('결과', this.state.data)
                            })

                        } catch (err) {
                            sessionStorage.clear()
                            alert(err);
                        }
                    },
                    fail: function (error: any) {
                        alert(JSON.stringify(error));
                    }
                });
            },
            fail: function (err: any) {
                alert("카카오 로그인 실패");
            }
        });
    }
    render() {
        return (
            <StGgLogin>
                <img src='/images/kakao_account_login_btn_medium_narrow.png' onClick={this.loginWithKakao} />
            </StGgLogin>
        );
    }
}
const StGgLogin = styled.div`
    display: flex;
    flex-flow: column wrap;
    cursor: pointer;
`;
export default withRouter(KakaoSignUp);