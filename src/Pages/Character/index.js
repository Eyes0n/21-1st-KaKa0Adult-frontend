import { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'next/router';
import ProductList from '../../components/common/ProductList';
import FilterModal from '../../components/pageComponents/Character/FilterModal';
import { API } from '../../config';
import { categoryData } from '../../Data/categoryData';
import { characterData } from '../../Data/characterData';
import { fetchGet } from '../../utils/fetches';
import styles from './index.module.scss';
import Nav from '../../components/common/Nav';
import MainTab from '../../components/common/MainTab';

const PAGE_SIZE = 10;

const Character = ({ router }) => {
  const [products, setProducts] = useState({
    list: [],
    totalCount: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    categoryFilter: categoryData,
    characterFilter: characterData,
  });
  const [modalFilter, setModalFilter] = useState({
    condition: [
      { name: '신상품순', isCheck: true },
      { name: '판매량순', isCheck: false },
      { name: '낮은가격순', isCheck: false },
      { name: '높은가격순', isCheck: false },
    ],
    filteringName: '신상품순',
  });

  // TODO: 무한 스크롤 기능으로 page 업데이트 해주기
  const [page, setPage] = useState(0);

  const {
    query: { type },
  } = router;

  const getCharacterDataAPI = (name, page) => {
    fetchGet(
      // `${API}/products?character=${name}&page=${page}&pageSize=${PAGE_SIZE}`,
      'http://localhost:3000/data/characterData.json',
    )
      .then((res) => res.json())
      .then((result) =>
        setProducts({
          list: result.resultList,
          totalCount: result.totalCount,
        }),
      );
  };

  useEffect(() => {
    getCharacterDataAPI(type, page);
  }, [page, type]);

  const onSelectCharacter = (name) => {
    router.push(`/character?type=${name}`);
  };

  const toggleFilterModal = (e) => {
    const classListArr = [...e.target.classList];

    if (!isModalOpen) {
      setIsModalOpen(true);
    } else {
      if (classListArr.find((classList) => classList.match(/dim/))) {
        setIsModalOpen(false);
      }
    }
  };

  const FILTER_NAME_MAPPING = useMemo(
    () => ({
      신상품순: 'id',
      판매량순: 'stock',
      낮은가격순: 'price',
      높은가격순: 'price',
    }),
    [],
  );

  const selectFilterCheck = (targetIdx, name) => {
    const prevChange = modalFilter.condition.map((el) =>
      el.isCheck ? { ...el, isCheck: !el.isCheck } : el,
    );

    const nextFilters = prevChange.map((el, idx) =>
      targetIdx === idx ? { ...el, isCheck: !el.isCheck } : el,
    );

    setModalFilter({
      condition: nextFilters,
      filteringName: modalFilter.condition[targetIdx].name,
    });

    // '신상품순' -> id  높은 값이 우선
    // '판매량순' -> stock 높은 값이 우선
    // '낮은가격순' -> price 낮은 값이 우선
    // '높은가격순' -> price 높은 값이 우선
    const updatedProducts = [...products.list].sort((a, b) => {
      if (name === ('높은가격순' || '신상품순')) {
        // 내림차순 2 -> 1
        return b[FILTER_NAME_MAPPING[name]] - a[FILTER_NAME_MAPPING[name]];
      }
      // 오름차순 1 -> 2
      return a[FILTER_NAME_MAPPING[name]] - b[FILTER_NAME_MAPPING[name]];
    });

    setProducts((prev) => ({
      ...prev,
      list: updatedProducts,
    }));
    setIsModalOpen(false);
  };

  return (
    <>
      <Nav />
      <MainTab />
      <section className={styles.characterWrap}>
        <div className={styles.bannerWrap}>
          <span className={styles.bannerTitle}>{type}</span>
          <img
            className={styles.DropBtn}
            src="/images/bigdropdown.png"
            alt="dropbox"
          />
          <select
            value={type}
            onChange={(e) => onSelectCharacter(e.target.value)}
          >
            {filter.characterFilter.map((chac) => (
              <option key={chac.id}>{chac.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterWrap}>
          <div className={styles.filter}>
            <div className={styles.filterName} onClick={toggleFilterModal}>
              <span>{modalFilter.filteringName}</span>
              <img src="/images/dropdown.png" alt="dropdown" />
            </div>
          </div>
          <div className={styles.filteredInfo}>
            <div className={styles.filterTxt}>
              <span>총</span>
              <span>{products.totalCount}</span>
              <span>개</span>
            </div>
            <div className={styles.filterCheckBox}>
              <img src="/images/checkIcon.png" alt="체크" />
              <span className={styles.filterGlobaltxt}>
                글로벌 배송 가능상품 보기
              </span>
            </div>
          </div>
        </div>
        <div className={styles.listWrap}>
          <ProductList products={products.list} />
        </div>
      </section>
      {isModalOpen && (
        <FilterModal
          filters={modalFilter.condition}
          toggleFilterModal={toggleFilterModal}
          selectFilterCheck={selectFilterCheck}
        />
      )}
    </>
  );
};

export default withRouter(Character);
