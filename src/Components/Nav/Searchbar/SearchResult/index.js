import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchResult extends Component {
  render() {
    return (
      <ul className="searchResultWrap">
        <li>
          <Link to="/" className="searchResult">
            검색결과
          </Link>
        </li>
      </ul>
    );
  }
}
