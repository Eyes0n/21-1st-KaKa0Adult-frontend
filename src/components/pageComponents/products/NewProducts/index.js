import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Carousel from '../../../common/Carousel';
import ProductList from '../../../common/ProductList';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import { USER_API, CART_API, PRODUCT_API, API } from '../../../../config';
import styles from './index.module.scss';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';

const PAGE_SIZE = 10;

const NewProducts = ({ productArr, totalPages }) => {
  // productsList : [[{},{},.. ], [{},{},...],...]
  const [productsList, setProductsList] = useState([productArr]);
  const [page, setPage] = useState(1);
  const totalPageCount = useMemo(() => totalPages, [totalPages]);

  const fetcher = useCallback(async () => {
    const res = await fetchGet(
      `${API}/products?order=new&pageSize=${PAGE_SIZE}&page=${page}`
    );

    if (res.status === 204) return;
    const data = await res.json();
    if (data !== null && data.resultList !== []) {
      setProductsList((prev) => [...prev, data.resultList]);
    }
  }, [page]);

  const updatePage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useInfiniteScroll(page, totalPageCount, fetcher, updatePage, 800);

  return (
    <>
      <article className={styles.NewProducts}>
        <Carousel />
        <div className={styles.wrapLists}>
          <div className={styles.listsContainer}>
            <p className={styles.subtitle}>따끈따끈 새로나온</p>
            <strong className={styles.title}>신상품</strong>
          </div>
          <ProductList productsList={productsList} />
        </div>
      </article>
    </>
  );
};

export default NewProducts;
