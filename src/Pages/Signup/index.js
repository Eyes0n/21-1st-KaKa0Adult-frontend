import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { API, USER_API } from '../../config';
import { fetchPost } from '../../utils/fetches';
import { REGEXP, validate } from '../../utils/regex';
import styles from './index.module.scss';

const BIRTH_YEARS = Array(20)
  .fill()
  .map((v, i) => i + 1990);

const BIRTH_MONTH = Array(12)
  .fill()
  .map((v, i) => i + 1);

const BIRTH_DAY = Array(31)
  .fill()
  .map((v, i) => i + 1);

class Signup extends Component {
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

  validateInputData = (id, pw) => {
    return (
      validate(id, REGEXP.emailRegExp) && validate(pw, REGEXP.passwordRegExp)
    );
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, phone_number, nickname, gender } = this.state;

    if (!this.validateInputData(this.state.email, this.state.password)) return;

    fetchPost(`${USER_API}/users/signup`, {
      email,
      password,
      phone_number,
      nickname,
      gender,
      birth: `${this.state.year}.${this.state.month}.${this.state.day}`,
    }).then((res) => res.ok && this.props.history.push('/login'));
  };

  render() {
    const { email, password } = this.state;
    return (
      <main className={styles.signup}>
        <div className={styles.signupContainer}>
          <section className={styles.header}>
            <h1 className={styles.logo}>KoKoo</h1>
          </section>
          <section className={styles.main}>
            <div className={styles.mainWrap}>
              <h2 className={styles.mainTitle}>계정 정보를 입력해 주세요.</h2>
              <form className={styles.mainForm} onSubmit={this.handleSubmit}>
                <div className={styles.email}>
                  <strong className={styles.emailTitle}>계정 이메일</strong>
                  <div className={styles.emailBox}>
                    <label className={styles.emailLabel}>
                      <input
                        autoComplete="off"
                        name="email"
                        className={styles.emailInput}
                        type="text"
                        placeholder="이메일 입력"
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                  <ul className={styles.emailCautionLists}>
                    <li className={styles.emailCautionList}>
                      ・ 입력한 메일로 카오펫 계정에 로그인할 수 있습니다.
                    </li>
                    <li className={styles.emailCautionList}>
                      ・ 한번 만든 카오펫 메일은 변경할 수 없으니, 오타가 없도록
                      신중히 확인해 주세요.
                    </li>
                    <li className={styles.emailCautionList}>
                      ・ 이메일은 @포함, 비밀번호는 5글자 이상 작성 형식을
                      지켜주세요.
                    </li>
                    <li className={styles.emailCautionList}>
                      ・ 생성한 카카오메일로 카카오계정과 관련한 알림을 받아볼
                      수 있습니다.
                    </li>
                  </ul>
                </div>
                <div className={styles.pw}>
                  <strong className={styles.pwTitle}>비밀번호</strong>
                  <div className={styles.pwBox}>
                    <label className={styles.pwLabel}>
                      <input
                        autoComplete="off"
                        className={styles.pwInput}
                        type="password"
                        name="password"
                        placeholder="비밀번호(8~32자리)"
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                </div>
                <div className={styles.nickname}>
                  <strong className={styles.nicknameTitle}>닉네임</strong>
                  <div className={styles.nicknameBox}>
                    <label className={styles.nicknameLabel}>
                      <input
                        autoComplete="off"
                        className={styles.nicknameInput}
                        type="text"
                        name="nickname"
                        placeholder="닉네임을 입력해 주세요."
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                </div>
                <div className={styles.phone}>
                  <strong className={styles.phoneTitle}>전화번호</strong>
                  <div className={styles.phoneBox}>
                    <label className={styles.phoneLabel}>
                      <input
                        autoComplete="off"
                        className={styles.phoneInput}
                        type="text"
                        name="phone_number"
                        placeholder="전화번호를 입력해 주세요."
                        onChange={this.handleInput}
                      />
                    </label>
                  </div>
                </div>
                <div className={styles.birthday}>
                  <strong className={styles.birthdayTitle}>생일</strong>
                  <div className={styles.birthdayBox}>
                    <label className={styles.birthdayLabel}>
                      <div className={styles.dateBox}>
                        <div className={styles.yearSelect}>
                          <select
                            name="year"
                            id="birthYear"
                            onChange={this.handleInput}
                          >
                            <option value="">연도</option>
                            {BIRTH_YEARS.map((year) => {
                              return (
                                <option value={year} key={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className={styles.monthSelect}>
                          <select
                            name="month"
                            id="birthMonth"
                            onChange={this.handleInput}
                          >
                            <option value="">월</option>
                            {BIRTH_MONTH.map((month) => {
                              return (
                                <option value={month} key={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className={styles.daySelect}>
                          <select
                            name="day"
                            id="birthDay"
                            onChange={this.handleInput}
                          >
                            <option value="">일</option>
                            {BIRTH_DAY.map((day) => {
                              return (
                                <option value={day} key={day}>
                                  {day}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className={styles.gender}>
                  <strong className={styles.genderTitle}>성별</strong>
                  <div className={styles.genderBox}>
                    <div className={styles.femaleSelect}>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={this.handleInput}
                      />
                      <label htmlFor="female" className={styles.femaleLabel}>
                        여성
                      </label>
                    </div>
                    <div className={styles.maleSelect}>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={this.handleInput}
                      />
                      <label htmlFor="male" className={styles.maleLabel}>
                        남성
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonBox}>
                  <button
                    className={styles.button}
                    onClick={this.handleSubmit}
                    disabled={!this.validateInputData(email, password)}
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

export default withRouter(Signup);
