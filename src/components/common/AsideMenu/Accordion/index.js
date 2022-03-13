import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

class Accordion extends Component {
  constructor() {
    super();
    this.state = { isShowList: false };
  }

  toggleList = () => {
    const { isShowList } = this.state;
    this.setState({ isShowList: !isShowList });
  };

  render() {
    const { isShowList } = this.state;
    const { type, title, characters, categories } = this.props;

    return (
      <>
        <button className={styles.accordionBtn} onClick={this.toggleList}>
          {title}
          <span
            className={`${styles.arrow} ${isShowList ? styles.rotate : ''}`}
          ></span>
        </button>
        {isShowList &&
          (type === 'character' ? (
            <ul className={styles.characters}>
              {characters.length &&
                characters.map((character) => (
                  <li key={character.id} className={styles.characterItem}>
                    <Link
                      href={`/products/character/${character.name}`}
                      className={styles.characterLink}
                    >
                      <a>
                        <div className={styles.character}>
                          <img
                            className={characterImg}
                            src="https://jotasic.github.io/21-kaka0-pet-shop-images/images/PetCharacter.png"
                            alt={character.name}
                          />
                          <span className={styles.characterSpan}>
                            {character.name}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <ul className={styles.category}>
              {categories?.map((category) => (
                <li key={category.id} className={styles.categoryItem}>
                  <Link href={`/products/category`}>
                    <a className={styles.categoryLink}>{category.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
      </>
    );
  }
}

export default Accordion;
