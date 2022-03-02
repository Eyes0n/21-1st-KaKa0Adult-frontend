import React, { Component } from 'react';
import CarouselList from '../CarouselList';
import { withRouter } from 'react-router';
import './index.scss';

const CARD_WIDTH = 640;

export default withRouter(
  class CarouselFrame extends Component {
    render() {
      const { listTransform, listTransition, moveToPrev, moveToNext, imgData } =
        this.props;

      return (
        <div className="frameWrap">
          <div className="frameContainer">
            <div
              className="innerCarouselList"
              style={{
                transform: `translateX(${listTransform}px)`,
                transition: `${listTransition}`,
              }}
            >
              {imgData.imageUrls &&
                imgData.imageUrls.map((el, i) => {
                  return <CarouselList key={i} img={el} />;
                })}
            </div>
          </div>
          <button
            type="button"
            className="btnPrev"
            onClick={moveToPrev}
          ></button>
          <button
            type="button"
            className="btnNext"
            onClick={moveToNext}
          ></button>
          <div className="countNumBox">
            <span className="countNum">
              <span>
                {listTransform === 0
                  ? 1
                  : Math.abs(listTransform / CARD_WIDTH) + 1}
              </span>
              <span> / 3</span>
            </span>
          </div>
        </div>
      );
    }
  },
);
