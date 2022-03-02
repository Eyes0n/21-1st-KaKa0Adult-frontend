import React, { Component } from 'react';
import CarouselFrame from './CarouselFrame';
import './index.scss';

const CARD_WIDTH = 640;
const INTERVAL = 3000;

export default class InnerCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTransform: 0,
      listTransition: '1s ease-in-out',
    };
  }

  moveToNext = () => {
    if (this.state.listTransform > -CARD_WIDTH * 2) {
      this.setState({
        listTransform: this.state.listTransform - CARD_WIDTH,
        listTransition: '1s ease-in-out',
      });
    } else {
      this.setState({
        listTransform: 0,
        listTransition: '0s',
      });
    }
  };

  moveToPrev = () => {
    if (this.state.listTransform < 0) {
      this.setState({
        listTransform: this.state.listTransform + CARD_WIDTH,
        listTransition: '1s ease-in-out',
      });
    } else {
      this.setState({
        listTransform: -CARD_WIDTH * 2,
        listTransition: '0s',
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.moveToNext();
    }, INTERVAL);
  }

  render() {
    const { listTransition, listTransform } = this.state;
    const { moveToPrev, moveToNext } = this;
    const { imgData } = this.props;
    return (
      <div className="Carousel">
        <section className="carouselWrap">
          <CarouselFrame
            imgData={imgData}
            listTransform={listTransform}
            listTransition={listTransition}
            moveToPrev={moveToPrev}
            moveToNext={moveToNext}
          />
        </section>
      </div>
    );
  }
}
