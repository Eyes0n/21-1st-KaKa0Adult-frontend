import React, { Component } from 'react';
import { characterData } from '../../Data/characterData';
import { categoryData } from '../../Data/categoryData';
import Menu from './Menu';
import './index.scss';

class AsideMenu extends Component {
  constructor() {
    super();

    this.state = {
      characters: [],
      categories: [],
      isSlide: false,
    };
  }

  componentDidMount() {
    this.setState({
      characters: characterData,
      categories: categoryData,
    });
  }

  onToggleSlide = () => {
    const { isSlide } = this.state;
    this.setState({ isSlide: !isSlide });
  };

  render() {
    const User = 'User';
    const { characters, categories, isSlide } = this.state;
    const { isOpen, onToggleSideMenu } = this.props;

    return (
      <div
        className={isOpen ? 'sideMenuWrap openBg' : 'sideMenuWrap'}
        onClick={onToggleSideMenu}
      >
        <Menu
          isOpen={isOpen}
          isSlide={isSlide}
          user={User}
          characters={characters}
          categories={categories}
        />
      </div>
    );
  }
}

export default AsideMenu;
