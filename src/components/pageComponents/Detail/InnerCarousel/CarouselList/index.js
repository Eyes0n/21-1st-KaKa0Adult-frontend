import React, { Component } from 'react';

export default class CarouselList extends Component {
  render() {
    const { id, img, title, subtitle } = this.props;
    return (
      <div className="slideContent" key={id}>
        <img alt="{banner}" src={img} />
        <div className="titleContents">
          <h2 className="title">{title}</h2>
          <h3 className="subTitle">{subtitle}</h3>
        </div>
      </div>
    );
  }
}
