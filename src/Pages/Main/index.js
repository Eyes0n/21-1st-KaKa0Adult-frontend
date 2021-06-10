import React, { Component } from 'react';
import MainTab from '../../Components/MainTab';
import Nav from '../../Components/Nav';
import './index.scss';

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
              </main>
            </article>
          </div>
        </div>
      </>
    );
  }
}
