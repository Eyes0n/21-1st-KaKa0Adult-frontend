import { useState, useEffect } from 'react';
import { characterData } from '../../../Data/characterData';
import { categoryData } from '../../../Data/categoryData';
import Menu from './Menu';
import styles from './index.module.scss';

const AsideMenu = ({ isOpen, closeSideMenu }) => {
  const [kind, setKind] = useState({
    characters: [],
    categories: [],
  });
  const [isSlide, setIsSlide] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user_name');

    setKind({
      characters: characterData,
      categories: categoryData,
    });
    setIsSlide(true);
    setUser(user ? user : null);
  }, []);

  return (
    <div
      className={
        isSlide
          ? `${styles.sideMenuWrap} ${styles.openBg}`
          : styles.sideMenuWrap
      }
      onClick={closeSideMenu}
    >
      <Menu
        isOpen={isOpen}
        isSlide={isSlide}
        user={user}
        characters={kind.characters}
        categories={kind.categories}
        closeSideMenu={closeSideMenu}
      />
    </div>
  );
};

export default AsideMenu;
