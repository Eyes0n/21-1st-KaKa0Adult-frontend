import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Carousel from '../../../common/Carousel';
import ProductList from '../../../common/ProductList';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import { USER_API, CART_API, PRODUCT_API, API } from '../../../../config';
import styles from './index.module.scss';

const PAGE_SIZE = 10;

const NewProducts = ({ productArr, totalPages }) => {
  // productsList : [[{},{},.. ], [{},{},...],...]
  const [productsList, setProductsList] = useState([productArr]);
  const [page, setPage] = useState(1);
  const totalPageCount = useMemo(() => totalPages, [totalPages]);

  useEffect(() => {
    if (page !== 1 && page <= totalPageCount) {
      fetchGet(`${API}/products?order=new&pageSize=${PAGE_SIZE}&page=${page}`)
        .then((res) => {
          if (res.status === 204) return null;
          return res.json();
        })
        .then((result) => {
          if (result !== null) {
            setProductsList((prev) => [...prev, result.resultList]);
          }
        });
    }
  }, [page, totalPageCount]);

  const infiniteScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 &&
      page <= totalPageCount
    ) {
      setPage((prev) => prev + 1);
    }
  }, [page, totalPageCount]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [infiniteScroll]);

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
