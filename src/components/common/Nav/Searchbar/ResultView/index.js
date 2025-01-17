import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class ResultView extends Component {
  render() {
    const { searchResult, searchbarOff } = this.props;
    return (
      <>
        {!searchResult.length && (
          <div className={styles.noResult}>검색결과가 없습니다.</div>
        )}

        <ul className={styles.resultUl}>
          {searchResult.map((data) => (
            <li key={data.id} onClick={searchbarOff}>
              <Link href={`/products/${data.id}`}>
                <a className={styles.resultLink}>{data.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
