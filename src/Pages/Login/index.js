import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API, USER_API } from '../../config';
import { fetchPost } from '../../utils/fetches';
import { REGEXP, validate } from '../../utils/regex';
import Footer from './Footer';
import './index.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { userId: '', userPw: '', loggedUser: {} };
  }

  validateInputData = (id, pw) => {
    return (
      validate(id, REGEXP.emailRegExp) && validate(pw, REGEXP.passwordRegExp)
    );
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { userId, userPw } = this.state;

    if (!this.validateInputData(userId, userPw)) return;

    fetchPost(`${USER_API}/users/login`, {
      email: userId,
      password: userPw,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user_name', result['user_name']);

          this.setState({
            loggedUser: result.userInfo,
          });

          this.props.history.push('/products/newList');
        }
      })
      .catch((error) => {
        console.log(`error ${error.message}`);
      });
  };

  render() {
    const { userId, userPw } = this.state;

    return (
      <div>
        <div className="loginPage">
          <div className="loginContainer">
            <div className="loginWrap">
              <div className="loginBanner">
                <div className="bannerWrap">
                  <div className="info">
                    <p className="strongTxt">Pet shop계정 하나로 충분합니다.</p>
                    <p className="description">
                      Pet shop의 모든 서비스 뿐 아니라 Pelon, Paum등 다른 다양한
                      서비스까지 <br />
                      이제 펫샵 계정으로 이용해 보세요!
                    </p>
                  </div>
                  <img
                    alt="login banner"
                    src="https://jotasic.github.io/21-kaka0-pet-shop-images/images/banner_login.png"
                  />
                </div>
                <div className="formWrap">
                  <h1 className="logo">
                    <p>Pet Shop</p>
                  </h1>
                  <div className="formContainer">
                    <form onSubmit={this.handleSubmit}>
                      <input
                        type="text"
                        name="userId"
                        placeholder="메일 아이디, 이메일, 전화번호"
                        value={userId}
                        onChange={this.handleInput}
                      />
                      <input
                        type="password"
                        name="userPw"
                        placeholder="비밀번호"
                        value={userPw}
                        onChange={this.handleInput}
                      />

                      <div className="keepLogin">
                        <label>
                          <input type="checkbox" className="keepLoginInBox" />
                          로그인 상태 유지
                        </label>
                      </div>

                      <button
                        className="loginBtn"
                        disabled={!this.validateInputData(userId, userPw)}
                        onClick={this.handleSubmit}
                      >
                        로그인
                      </button>
                    </form>
                  </div>
                  <div className="lineWrap">
                    <span className="line"></span>
                    <span className="lineWord">또는</span>
                    <span className="line"></span>
                  </div>

                  <button className="qrBtn" type="button">
                    QR코드 로그인
                  </button>

                  <div className="infoUser">
                    <Link to="/signup">회원가입</Link>
                    <div>
                      <Link to="/">카카오계정</Link>
                      <Link to="/">비밀번호 찾기</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
