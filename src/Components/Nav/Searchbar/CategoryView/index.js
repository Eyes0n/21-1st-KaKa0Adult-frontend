import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CategoryView extends Component {
  render() {
    const { characters, categories } = this.props;
    return (
      <>
        <div className="charactersWrap">
          <ul className="charactersUI">
            {characters.map((character) => {
              return (
                <li className="charactersUIList" key={character.name}>
                  <Link
                    to={`/products/character/${character.name}`}
                    className="charactersUILink"
                  ></Link>
                  <p className="charactersName">{character.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="dividingLine" />
        <p className="categoryTitle">카테고리</p>
        <ul className="categoryLists">
          {categories.map((category) => {
            return (
              <li className="categoryList" key={category.name}>
                <Link to="/" className="categoryLink">
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
