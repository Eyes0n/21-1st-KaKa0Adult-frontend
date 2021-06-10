import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class MainTab extends Component {
  render() {
    return (
      <div className="mainTabWrap">
        <ul className="mainTabUI">
          <li className="tabList">
            <Link to="/">
              <div className="tabItem">
                <span className="tabName">신규</span>
              </div>
            </Link>
          </li>
          <li className="tabList">
            <Link to="/">
              <div className="tabItem">
                <span className="tabName">
                  인기<span className="badge"></span>
                </span>
              </div>
            </Link>
          </li>
          <li className="tabList">
            <Link to="/">
              <div className="tabItem">
                <span className="tabName">마이</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
