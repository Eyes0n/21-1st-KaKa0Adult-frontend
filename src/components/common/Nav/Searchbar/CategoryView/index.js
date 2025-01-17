import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class CategoryView extends Component {
  render() {
    const { characters, categories, searchbarOff } = this.props;
    return (
      <>
        <div className={styles.charactersWrap}>
          <p className={styles.charactersTitle}>캐릭터</p>
          <ul className={styles.charactersUI}>
            {characters.map((character) => {
              return (
                <li
                  className={styles.charactersUIList}
                  key={character.name}
                  onClick={searchbarOff}
                >
                  <Link href={`/character?type=${character.name}`}>
                    <a className={styles.charactersUILink}></a>
                  </Link>
                  <p className={styles.charactersName}>{character.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className={styles.dividingLine} />
        <p className={styles.categoryTitle}>카테고리</p>
        <ul className={styles.categoryLists}>
          {categories.map((category) => {
            return (
              <li
                className={styles.categoryList}
                key={category.name}
                onClick={searchbarOff}
              >
                <Link href={`/categoty?type=${category.name}`}>
                  <a className={styles.categoryLink}>{category.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
