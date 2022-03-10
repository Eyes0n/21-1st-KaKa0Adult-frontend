import React, { Component } from 'react';
import CategoryView from './CategoryView';
import ResultView from './ResultView';
import { categoryData } from '../../../Data/categoryData';
import { characterData } from '../../../Data/characterData';
import { fetchGet } from '../../../utils/fetches';
import { PRODUCT_API } from '../../../config';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      searchResult: [],
    };
  }

  setSearchKeyword = (e) => {
    this.setState(
      {
        searchKeyword: e.target.value,
      },
      (e) => this.handleChangeInput(e),
    );
  };

  handleReset = () => {
    this.setState({
      searchKeyword: '',
    });
  };

  handleChangeInput(event) {
    // const searchKeyword = event.target.value;

    const { searchKeyword } = this.state;
    !searchKeyword.length ? this.handleReset() : this.fetchSearchResult();
  }

  fetchSearchResult = () => {
    fetchGet(`${PRODUCT_API}/products?search=${this.state.searchKeyword}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.resultList);
        this.setState({
          searchResult: result.resultList,
        });
      });
  };

  render() {
    const { searchKeyword, searchResult } = this.state;
    const { searchbarOff } = this.props;

    return (
      <>
        <div className="searchModal">
          <div className="searchForm">
            <form className="searchInputWrap" onSubmit={this.handleReset}>
              <input
                className="searchInput"
                id="keyword"
                name="keyword"
                value={searchKeyword}
                onChange={this.setSearchKeyword}
                autoComplete="off"
              />
              <button
                type="reset"
                className="resetBtn"
                onClick={this.handleReset}
              ></button>
            </form>
            <button className="searchCloseBtn" onClick={searchbarOff}>
              취소
            </button>
          </div>

          <div className="searchBottomWrap">
            {searchKeyword.length > 0 ? (
              // 검색결과가 있을 경우
              <ResultView
                searchbarOff={searchbarOff}
                searchResult={searchResult}
              />
            ) : (
              // 검색결과가 없을 경우
              <CategoryView
                categories={categoryData}
                characters={characterData}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
