import React, { Component } from 'react';
import styles from './index.module.scss';

export default class CarouselList extends Component {
  render() {
    const { id, img, title, subtitle } = this.props;
    return (
      <div className={styles.slideContent} key={id}>
        <img alt="banner" src={img} />
        <div className={styles.titleContents}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.subTitle}>{subtitle}</h3>
        </div>
      </div>
    );
  }
}
