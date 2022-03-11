import React, { Component } from 'react';
import { characterData } from '../../Data/characterData';
import { categoryData } from '../../Data/categoryData';
import Menu from './Menu';
import { withRouter } from 'next/router';
import styles from './index.module.scss';

class AsideMenu extends Component {
  constructor() {
    super();

    this.state = {
      characters: [],
      categories: [],
      isSlide: false,
      user: '',
    };
  }

  componentDidMount() {
    const user = localStorage.getItem('user_name');

    const nextState = Object.assign(
      {
        characters: characterData,
        categories: categoryData,
        isSlide: true,
      },
      user ? { user } : null,
    );

    this.setState(nextState);
  }

  toggleSlide = () => {
    const { isSlide } = this.state;
    this.setState({ isSlide: !isSlide });
  };

  render() {
    const { user, characters, categories, isSlide } = this.state;
    const { isOpen, toggleSideMenu, history } = this.props;

    return (
      <div
        className={
          isSlide
            ? `${styles.sideMenuWrap} ${styles.openBg}`
            : styles.sideMenuWrap
        }
        onClick={toggleSideMenu}
      >
        <Menu
          isOpen={isOpen}
          isSlide={isSlide}
          user={user}
          characters={characters}
          categories={categories}
          toggleSideMenu={toggleSideMenu}
          history={history}
        />
      </div>
    );
  }
}

export default withRouter(AsideMenu);
