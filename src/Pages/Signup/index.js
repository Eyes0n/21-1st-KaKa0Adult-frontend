import React, { Component } from 'react';
import './index.scss';

const REGEXP = {
  emailRegExp:
    /[a-zA-Z0-9.-_+!]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(?:.[a-zA-Z0-9]{2,3})?/,
  passwordRegExp: /[a-zA-Z0-9]{5,100}/,
};

const BIRTH_YEARS = Array(20)
  .fill()
  .map((v, i) => i + 1990);
const BIRTH_MONTH = Array(12)
  .fill()
  .map((v, i) => i + 1);
const BIRTH_DAY = Array(31)
  .fill()
  .map((v, i) => i + 1);

export default class Singup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nickname: '',
      phone_number: '',
      gender: '',
      year: '',
      month: '',
      day: '',
    };
  }

  validate = (value, regExp) => {
    const reg = new RegExp(regExp);
    return reg.test(value);
  };

  validateInputData = (id, pw) => {
    return (
      this.validate(id, REGEXP.emailRegExp) &&
      this.validate(pw, REGEXP.passwordRegExp)
    );
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateInputData(this.state.email, this.state.password)) return;
    let response = fetch('http://10.58.3.32:8000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        phone_number: this.state.phone_number,
        nickname: this.state.nickname,
        birth: `${this.state.year}.${this.state.month}.${this.state.day}`,
        gender: this.state.gender,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log('결과: ', result));
    response.ok && this.props.history.push('/login');
  };

  render() {
    return (
      <main className="signup">
        <div className="signupContainer">
          <section className="header">
            <h1 className="logo">KaKao</h1>
          </section>
          <section className="main">
            <div className="mainWrap">
              <h2 className="mainTitle">카카오계정 정보를 입력해 주세요.</h2>
              <form className="mainForm" onSubmit={this.handleSubmit}>
                <div className="email">
                  <strong className="emailTitle">카카오계정 이메일</strong>
                  <div className="emailBox">
                    <label className="emailLabel">
                      <input
                        name="email"
                        className="emailInput"
                        type="text"
                        placeholder="이메일 입력"
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                  <ul className="emailCautionLists">
                    <li className="emailCautionList">
                      ・ 입력한 카카오메일로 카카오계정에 로그인할 수 있습니다.
                    </li>
                    <li className="emailCautionList">
                      ・ 한번 만든 카카오메일은 변경할 수 없으니, 오타가 없도록
                      신중히 확인해 주세요.
                    </li>
                    <li className="emailCautionList">
                      ・ 이메일은 @포함, 비밀번호는 5글자 이상 작성 형식을
                      지켜주세요.
                    </li>
                    <li className="emailCautionList">
                      ・ 생성한 카카오메일로 카카오계정과 관련한 알림을 받아볼
                      수 있습니다.
                    </li>
                  </ul>
                </div>
                <div className="pw">
                  <strong className="pwTitle">비밀번호</strong>
                  <div className="pwBox">
                    <label htmlFor="pwInput" className="pwLabel">
                      <input
                        className="pwInput"
                        type="password"
                        name="password"
                        placeholder="비밀번호(8~32자리)"
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                </div>
                <div className="nickname">
                  <strong className="nicknameTitle">닉네임</strong>
                  <div className="nicknameBox">
                    <label htmlFor="nicknameInput" className="nicknameLabel">
                      <input
                        className="nicknameInput"
                        type="text"
                        name="nickname"
                        placeholder="닉네임을 입력해 주세요."
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                </div>
                <div className="phone">
                  <strong className="phoneTitle">전화번호</strong>
                  <div className="phoneBox">
                    <label htmlFor="phoneInput" className="phoneLabel">
                      <input
                        className="phoneInput"
                        type="text"
                        name="phone_number"
                        placeholder="전화번호를 입력해 주세요."
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                </div>
                <div className="birthday">
                  <strong className="birthdayTitle">생일</strong>
                  <div className="birthdayBox">
                    <label className="birthdayLabel">
                      <div className="dateBox">
                        <div className="yearSelect">
                          <select
                            name="year"
                            id="birthYear"
                            onChange={this.handleInput}
                          >
                            <option value="">연도</option>
                            {BIRTH_YEARS.map((el) => {
                              return <option value={el}>{el}</option>;
                            })}
                          </select>
                        </div>
                        <div className="monthSelect">
                          <select
                            name="month"
                            id="birthMonth"
                            onChange={this.handleInput}
                          >
                            <option value="">월</option>
                            {BIRTH_MONTH.map((el) => {
                              return <option value={el}>{el}</option>;
                            })}
                          </select>
                        </div>
                        <div className="daySelect">
                          <select
                            name="day"
                            id="birthDay"
                            onChange={this.handleInput}
                          >
                            <option value="">일</option>
                            {BIRTH_DAY.map((el) => {
                              return <option value={el}>{el}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="gender">
                  <strong className="genderTitle">성별</strong>
                  <div className="genderBox">
                    <div className="femaleSelect">
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={this.handleInput}
                      />
                      <label htmlFor="female" className="femaleLabel">
                        여성
                      </label>
                    </div>
                    <div className="maleSelect">
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={this.handleInput}
                      />
                      <label htmlFor="male" className="maleLabel">
                        남성
                      </label>
                    </div>
                  </div>
                </div>
                <div className="buttonBox">
                  <button
                    className="button"
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={
                      !this.validateInputData(
                        this.state.email,
                        this.state.password,
                      )
                    }
                  >
                    가입하기
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
