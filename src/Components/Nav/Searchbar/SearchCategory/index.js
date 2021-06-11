import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchCategory extends Component {
  render() {
    return (
      <>
        <div className="charactersWrap">
          <ul className="charactersUI">
            {this.props.characters.map((character) => {
              return (
                <li className="charactersUIList" key={character}>
                  <Link className="charactersUILink"></Link>
                  <p className="charactersName">{character}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="dividingLine" />
        <p className="categoryTitle">카테고리</p>
        <ul className="categoryHash">
          {this.props.categorys.map((category) => {
            return (
              <li className="categoryList" key={category}>
                <Link to="/" className="categoryLink">
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
