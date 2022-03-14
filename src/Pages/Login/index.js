import React, { Component } from 'react';
import Link from 'next/link';
import { API, USER_API } from '../../config';
import { fetchPost } from '../../utils/fetches';
import { REGEXP, validate } from '../../utils/regex';
import styles from './index.module.scss';
import Head from 'next/head';

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
      <>
        <Head>
          <title>KoKoo Pet Shop | login</title>
          <meta name="description" content="KoKoo Pet Shop login page" />
          <meta property="og:title" content="KoKoo Pet Shop | login" />
          <meta property="og:description" content="KoKoo Pet Shop login page" />
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
              <div className={styles.loginWrap}>
                <div className={styles.loginBanner}>
                  <div className={styles.bannerWrap}>
                    <div className={styles.info}>
                      <p className={styles.strongTxt}>
                        Pet shop계정 하나로 충분합니다.
                      </p>
                      <p className={styles.description}>
                        Pet shop의 모든 서비스 뿐 아니라 Pelon, Paum등 다른
                        다양한 서비스까지 <br />
                        이제 펫샵 계정으로 이용해 보세요!
                      </p>
                    </div>
                    <img
                      alt="login banner"
                      src="https://jotasic.github.io/21-kaka0-pet-shop-images/images/banner_login.png"
                    />
                  </div>
                  <div className={styles.formWrap}>
                    <h1 className={styles.logo}>
                      <p>Pet Shop</p>
                    </h1>
                    <div className={styles.formContainer}>
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

                        <div className={styles.keepLogin}>
                          <label>
                            <input
                              type="checkbox"
                              className={styles.keepLoginInBox}
                            />
                            로그인 상태 유지
                          </label>
                        </div>

                        <button
                          className={styles.loginBtn}
                          disabled={!this.validateInputData(userId, userPw)}
                          onClick={this.handleSubmit}
                        >
                          로그인
                        </button>
                      </form>
                    </div>
                    <div className={styles.lineWrap}>
                      <span className={styles.line}></span>
                      <span className={styles.lineWord}>또는</span>
                      <span className={styles.line}></span>
                    </div>

                    <button className={styles.qrBtn} type="button">
                      QR코드 로그인
                    </button>

                    <div className={styles.infoUser}>
                      <Link href="/signup">
                        <a>회원가입</a>
                      </Link>
                      <div>
                        <Link href="/">
                          <a>카카오계정</a>
                        </Link>
                        <Link href="/">
                          <a>비밀번호 찾기</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
