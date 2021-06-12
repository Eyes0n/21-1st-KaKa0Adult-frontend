import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class MainTab extends Component {
  constructor() {
    super();
    this.state = {
      focusUnderline1: false,
      focusUnderline2: false,
      focusUnderline3: true,
    };
  }
  makeLine = (index) => {
    this.setState({
      [`focusUnderline${index}`]: !this.state[`focusUnderline${index}`],
    });
  };

  render() {
    const { focusUnderline1, focusUnderline2, focusUnderline3 } = this.state;
    return (
      <div className="mainTabWrap">
        <ul className="mainTabUI">
          <li className="tabList">
            <Link to="/newproducts" onClick={() => this.makeLine(1)}>
              <div className="tabItem">
                <span
                  className={focusUnderline1 ? 'tabName active' : 'tabName'}
                >
                  신규
                </span>
              </div>
            </Link>
            <hr
              className={
                focusUnderline1 ? 'focusUnderline active' : 'focusUnderline'
              }
            ></hr>
          </li>
          <li className="tabList">
            <Link to="/hotproducts" onClick={() => this.makeLine(2)}>
              <div className="tabItem">
                <span
                  className={focusUnderline2 ? 'tabName active' : 'tabName'}
                >
                  인기<span className="badge"></span>
                </span>
              </div>
            </Link>
            <hr
              className={
                focusUnderline2 ? 'focusUnderline active' : 'focusUnderline'
              }
            ></hr>
          </li>
          <li className="tabList">
            <Link to="/mypage" onClick={() => this.makeLine(3)}>
              <div className="tabItem">
                <span
                  className={focusUnderline3 ? 'tabName active' : 'tabName'}
                >
                  마이
                </span>
              </div>
            </Link>
            <hr
              className={
                focusUnderline3 ? 'focusUnderline active' : 'focusUnderline'
              }
            ></hr>
          </li>
        </ul>
      </div>
    );
  }
}
