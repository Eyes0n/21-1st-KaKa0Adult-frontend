import { useState, useEffect, useCallback, useMemo } from 'react';
import { withRouter } from 'next/router';
import ProductList from '../../components/common/ProductList';
import FilterModal from '../../components/pageComponents/Character/FilterModal';
import { API } from '../../config';
import { categoryData } from '../../Data/categoryData';
import { characterData } from '../../Data/characterData';
import { fetchGet } from '../../utils/fetches';
import styles from './index.module.scss';
import divideArrByNumber from '../../utils/divideArrByNumber';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useProduct from '../../hooks/useProduct';

const PAGE_SIZE = 10;

export async function getServerSideProps(context) {
  const {
    query: { type },
  } = context;
  const res = await fetch(
    `${API}/products?character=${type}&page=1&pageSize=10`
  );
  const data = await res.json();
  const characters = data.resultList;
  const totalCount = data.totalCount;
  const totalPages = data.totalPageCount;

  return {
    props: { characters, totalPages, totalCount },
  };
}

const Character = ({
  router,
  characters,
  totalPages,
  totalCount: totalProductCount,
}) => {
  // products.list : [[{},{},...], [], [], ...]
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const totalPageCount = useMemo(() => totalPages, [totalPages]);

  useEffect(() => {
    setProducts([characters]);
    setTotalCount(totalProductCount);
    setPage(1);
  }, [characters, totalProductCount]);

  const {
    query: { type },
  } = router;

  const fetcher = useCallback(async () => {
    if (page === 1) {
      setPage((prev) => prev + 1);
      return;
    }
    if (page > totalPageCount) return;

    const res = await fetchGet(
      `${API}/products?character=${type}&page=${page}&pageSize=${PAGE_SIZE}`
    );

    if (res.status === 204) return;

    const data = await res.json();
    page !== 1 && setProducts((prev) => [...prev, data.resultList]);
    setPage((prev) => prev + 1);
  }, [page, totalPageCount, type]);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetcher, 800);

  const [productsArrList, toggleProductLike, addToCart] = useProduct(products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryFilter = useMemo(() => categoryData, []);
  const characterFilter = useMemo(() => characterData, []);

  const [modalFilter, setModalFilter] = useState({
    conditions: [
      { name: '신상품순', isCheck: true },
      { name: '판매량순', isCheck: false },
      { name: '낮은가격순', isCheck: false },
      { name: '높은가격순', isCheck: false },
    ],
    filteringName: '신상품순',
  });

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
    []
  );

  const selectFilterCheck = (targetIdx, name) => {
    const prevConditionsOff = modalFilter.conditions.map((condition) =>
      condition.isCheck
        ? { ...condition, isCheck: !condition.isCheck }
        : condition
    );

    const nextConditionsOn = prevConditionsOff.map((el, idx) =>
      targetIdx === idx ? { ...el, isCheck: !el.isCheck } : el
    );

    setModalFilter({
      conditions: nextConditionsOn,
      filteringName: modalFilter.conditions[targetIdx].name,
    });

    // 일단 이렇게 정렬을 가정.
    // '신상품순' -> id  높은 값이 우선
    // '판매량순' -> stock 높은 값이 우선
    // '낮은가격순' -> price 낮은 값이 우선
    // '높은가격순' -> price 높은 값이 우선

    // products: [ [{}, {}, ...], ... ] 2중 배열 형태
    // 1. flat -> sort
    const sortedProducts = products.flat(2).sort((a, b) => {
      if (name === ('높은가격순' || '신상품순')) {
        return b[FILTER_NAME_MAPPING[name]] - a[FILTER_NAME_MAPPING[name]];
      }
      return a[FILTER_NAME_MAPPING[name]] - b[FILTER_NAME_MAPPING[name]];
    });

    // 2. 1차원 배열 -> 2차원 배열
    const updatedProducts = divideArrByNumber(sortedProducts, 9);

    setProducts(updatedProducts);
    setIsModalOpen(false);
  };

  return (
    <>
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
            {characterFilter.map((chac) => (
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
              <span>{totalCount}</span>
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
          <ProductList
            productsList={productsArrList}
            toggleProductLike={toggleProductLike}
            addToCart={addToCart}
          />
          {isFetching && <p>loading more products</p>}
        </div>
      </section>
      {isModalOpen && (
        <FilterModal
          filters={modalFilter.conditions}
          toggleFilterModal={toggleFilterModal}
          selectFilterCheck={selectFilterCheck}
        />
      )}
    </>
  );
};

export default withRouter(Character);
