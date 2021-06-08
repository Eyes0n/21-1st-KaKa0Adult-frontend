import React, { Component } from 'react';
import './index.scss';

export default class Singup extends Component {
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
              <form className="mainForm">
                <div className="email">
                  <strong className="emailTitle">카카오계정 이메일</strong>
                  <div className="emailBox">
                    <label for="emailInput" className="emailLabel"></label>
                    <input
                      name="email"
                      id="emailInput"
                      type="text"
                      placeholder="아이디 입력"
                      maxLength="15"
                    />
                    <span className="emailTemp">@kakao.com</span>
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
                      ・ 생성한 카카오메일로 카카오계정과 관련한 알림을 받아볼
                      수 있습니다.
                    </li>
                  </ul>
                </div>
                <div className="pw">
                  <strong className="pwTitle">비밀번호</strong>
                  <div className="pwBox">
                    <label for="pwInput" className="pwLabel"></label>
                    <input
                      id="pwInput"
                      type="password"
                      name="password"
                      placeholder="비밀번호(8~32자리)"
                    />
                  </div>
                </div>
                <div className="nickname">
                  <strong className="nicknameTitle">닉네임</strong>
                  <div className="nicknameBox">
                    <label
                      for="nicknameInput"
                      className="nicknameLabel"
                    ></label>
                    <input
                      id="nicknameInput"
                      type="text"
                      name="name"
                      placeholder="닉네임을 입력해 주세요."
                    />
                  </div>
                </div>
                <div className="phone">
                  <strong className="phoneTitle">전화번호</strong>
                  <div className="phoneBox">
                    <label for="phoneInput" className="phoneLabel"></label>
                    <input
                      id="phoneInput"
                      type="text"
                      name="phone"
                      placeholder="전화번호를 입력해 주세요."
                    />
                  </div>
                </div>

                <div className="birthday">
                  <strong className="birthdayTitle">생일</strong>
                  <div className="birthdayBox">
                    <label for="birthYear" className="birthLabel"></label>
                    <div className="dateBox">
                      <div className="yearSelect">
                        <select name="year" id="birthYear">
                          <option value="">연도</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                        </select>
                      </div>
                      <div className="monthSelect">
                        <select name="month" id="birthMonth">
                          <option value="">월</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>
                      <div className="daySelect">
                        <select name="day" id="birthDay">
                          <option value="">일</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                        </select>
                      </div>
                    </div>
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
                      />
                      <label for="female" className="femaleLabel">
                        여성
                      </label>
                    </div>
                    <div className="maleSelect">
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                      />
                      <label for="male" className="maleLabel">
                        남성
                      </label>
                    </div>
                  </div>
                </div>
                <div className="buttonBox">
                  <button type="submit" className="button">
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
