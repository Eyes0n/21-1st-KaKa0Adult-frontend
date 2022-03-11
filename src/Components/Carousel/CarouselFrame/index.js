import React, { Component } from 'react';
import CarouselList from '../CarouselList';
import styles from './index.module.scss';

const CARD_WIDTH = 640;

export default class CarouselFrame extends Component {
  constructor() {
    super();
    this.state = {
      imgLists: [],
    };
  }
  componentDidMount() {
    fetch('/data/carouselData.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          imgLists: data,
        });
      });
  }

  render() {
    const { imgLists } = this.state;
    const { listTransform, listTransition, moveToPrev, moveToNext } =
      this.props;
    return (
      <div className={styles.frameWrap}>
        <div className={styles.frameContainer}>
          <div
            className={styles.carouselList}
            style={{
              transform: `translateX(${listTransform}px)`,
              transition: `${listTransition}`,
            }}
          >
            {imgLists.map((image) => {
              return (
                <CarouselList
                  key={image.id}
                  title={image.title}
                  subtitle={image.subtitle}
                  link={image.link}
                  img={image.img}
                />
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className={styles.btnPrev}
          onClick={moveToPrev}
        ></button>
        <button
          type="button"
          className={styles.btnNext}
          onClick={moveToNext}
        ></button>
        <div className={styles.countNumBox}>
          <span className={styles.countNum}>
            <span>
              {listTransform === 0
                ? 1
                : Math.abs(listTransform / CARD_WIDTH) + 1}
            </span>
            <span> / 5</span>
          </span>
        </div>
      </div>
    );
  }
}
