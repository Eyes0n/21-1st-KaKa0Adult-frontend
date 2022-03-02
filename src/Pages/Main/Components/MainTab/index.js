import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class MainTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
    };
  }

  setCurrentId = (id) => {
    this.setState({ currentId: id });
    console.log(this.props);
    this.props.checkMenuId(this.state.currentId);
  };

  render() {
    const { currentId } = this.state;

    return (
      <div className="mainTabWrap">
        <ul className="mainTabUI">
          {CATEGORY_ARR.map((category, idx) => {
            return (
              <li className="tabList" key={category}>
                <Link
                  to={`${PAGE_ARR[idx]}`}
                  onClick={() => {
                    this.setCurrentId(idx);
                  }}
                >
                  <div className="tabItem">
                    <span
                      className={
                        currentId === idx ? 'tabName active' : 'tabName'
                      }
                    >
                      {category}
                    </span>
                  </div>
                </Link>
                <hr
                  className="focusUnderline"
                  // className={
                  //   currentId === idx
                  //     ? 'focusUnderline active'
                  //     : 'focusUnderline'
                  // }
                ></hr>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const CATEGORY_ARR = ['신규', '인기', '마이'];

const PAGE_ARR = ['/products/newList', '/products/hot', '/mypage/cart'];
