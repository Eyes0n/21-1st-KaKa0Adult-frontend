import { useState, useEffect } from 'react';
import CategoryView from './CategoryView';
import ResultView from './ResultView';
import { categoryData } from '../../../../Data/categoryData';
import { characterData } from '../../../../Data/characterData';
import { fetchGet } from '../../../../utils/fetches';
import { PRODUCT_API } from '../../../../config';
import styles from './index.module.scss';
import useDebounce from '../../../../hooks/useDebounceValue';

const Searchbar = ({ searchbarOff }) => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

  const debouncedValue = useDebounce(keyword, 500);

  const getSearchAPI = (debouncedValue) => {
    fetchGet(
      // `${PRODUCT_API}/products?search=${debouncedValue}`
      'http://localhost:3000/data/searchProducts.json',
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.resultList);
        setResult(result.resultList);
      });
  };

  useEffect(() => {
    if (!debouncedValue) return;
    getSearchAPI(debouncedValue);
  }, [debouncedValue]);

  const handleInputReset = () => {
    setKeyword('');
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSubmit = () => {
    // api 요청은 useDebounceValue의 변화에 따라 useEffect에서 처리함.
    handleInputReset();
  };
  return (
    <>
      <div className={styles.searchModal}>
        <div className={styles.searchForm}>
          <form className={styles.searchInputWrap} onSubmit={handleSubmit}>
            <input
              className={styles.searchInput}
              id="keyword"
              name="keyword"
              value={keyword}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button
              type="reset"
              className={styles.resetBtn}
              onClick={handleInputReset}
            ></button>
          </form>
          <button className={styles.searchCloseBtn} onClick={searchbarOff}>
            취소
          </button>
        </div>

        <div className={styles.searchBottomWrap}>
          {keyword.length > 0 ? (
            // 검색결과가 있을 경우
            <ResultView searchbarOff={searchbarOff} searchResult={result} />
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
};

export default Searchbar;
