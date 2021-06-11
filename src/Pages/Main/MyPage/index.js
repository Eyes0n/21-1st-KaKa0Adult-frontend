import React, { Component } from 'react';
import SubTab from './SubTab';
import EmptyBasket from './EmptyBasket';
import StuffBasket from './StuffBasket';
import './index.scss';

export default class MyPage extends Component {
  render() {
    return (
      <>
        <SubTab />
        {/* <EmptyBasket /> */}
        <StuffBasket />
      </>
    );
  }
}
