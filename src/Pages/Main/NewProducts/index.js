import React, { Component } from 'react';
import ProductList from '../../../Components/ProductList';
import Nav from '../../../Components/Nav';
import MainTab from '../Components/MainTab';
import Carousel from '../../../Components/Carousel';
import Footer from '../../Login/Footer';
import styles from './index.module.scss';

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
        <article className={styles.NewProducts}>
          <MainTab checkMenuId={this.bringMenuId} />
          <Carousel />
          <div className={styles.wrapLists}>
            <div className={styles.listsContainer}>
              <p className={styles.subtitle}>따끈따끈 새로나온</p>
              <strong className={styles.title}>신상품</strong>
            </div>
            <ProductList />
          </div>
          <Footer />
        </article>
      </>
    );
  }
}
