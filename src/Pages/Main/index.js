import React, { Component } from 'react';
import Carousel from '../../Components/Carousel';
import Footer from '../../Components/Footer';
import Nav from '../../Components/Nav';
import MainTab from './Components/MainTab';
import HotProducts from '../../components/pageComponents/products/HotProducts';
import Mypage from '../mypage';
import NewProducts from './NewProducts';
import styles from './index.module.scss';
import Order from '../mypage/Cart/Order';

export default class Main extends Component {
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
      <div className={styles.Main}>
        <Nav />
        <div className={styles.mainArticle}>
          {/* <MainTab checkMenuId={this.bringMenuId} /> */}
          {MAPPING_OBJ[this.state.currentId]}
          <Order />
        </div>
        <Footer />
      </div>
    );
  }
}

const MAPPING_OBJ = {
  1: <NewProducts />,
  2: <HotProducts />,
  3: <Mypage />,
};
