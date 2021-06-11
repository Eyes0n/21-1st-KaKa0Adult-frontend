import React, { Component } from 'react';
import MainTab from './Components/MainTab';
import Nav from '../../Components/Nav';
import './index.scss';
import MyPage from './MyPage';

export default class Main extends Component {
  render() {
    return (
      <>
        <Nav />
        <div className="bodyContents">
          <div className="main">
            <article className="article">
              <main className="indexBasketWrap">
                <MainTab />
                <MyPage />
              </main>
            </article>
          </div>
        </div>
      </>
    );
  }
}
