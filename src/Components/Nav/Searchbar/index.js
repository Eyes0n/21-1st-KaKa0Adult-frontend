import React, { Component } from 'react';

import SearchCategory from './SearchCategory';
import SearchResult from './SearchResult';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serachKeyword: '',
      searchResult: [],
      categorys: ['토이', '먹이', '스티커', '발바닥', '집'],
      characters: ['고양이', '앵무새', '강아지', '고슴도치', '햄스터', '토끼'],
    };
  }

  setSerachKeyword = (e) => {
    this.setState({
      serachKeyword: e.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      serachKeyword: '',
    });
  };

  handleChangeInput(event) {
    const searchKeyword = event.target.value;
    if (searchKeyword.length === 0) return this.handleReset();
    this.setState({ searchKeyword });
  }

  render() {
    return (
      <>
        <div className="searchModal">
          <div className="searchForm">
            <form
              className="searchInputWrap"
              onSubmit={() => this.handleReset()}
            >
              <input
                className="searchInput"
                id="keyword"
                name="keyword"
                value={this.state.serachKeyword}
                onChange={this.setSerachKeyword}
                autoComplete="off"
              />
              <button
                type="reset"
                className="resetBtn"
                onClick={this.handleReset}
              ></button>
            </form>
            <button
              className="searchCloseBtn"
              onClick={this.props.handleSearch}
            >
              취소
            </button>
          </div>

          <div className="searchBottomWrap">
            {this.state.serachKeyword.length > 0 ? (
              // 검색결과가 있을 경우
              <SearchResult />
            ) : (
              // 검색결과가 없을 경우
              <SearchCategory
                categorys={this.state.categorys}
                characters={this.state.characters}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
