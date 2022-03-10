import React, { Component } from 'react';
import ProductList from '../../../Components/ProductList';
import Nav from '../../../Components/Nav';
import './index.scss';
import MainTab from '../Components/MainTab';
import Carousel from '../../../Components/Carousel';
import Footer from '../../Login/Footer';

export default class NewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
    };
  }

  bringMenuId = (id) => {
    this.setState({ currentId: id });
  };

  render() {
    return (
      <>
        <Nav />
        <article className="NewProducts">
          <MainTab checkMenuId={this.bringMenuId} />
          <Carousel />
          <div className="wrapLists">
            <div className="listsContainer">
              <p className="subtitle">따끈따끈 새로나온</p>
              <strong className="title">신상품</strong>
            </div>
            <ProductList />
          </div>
          <Footer />
        </article>
      </>
    );
  }
}
