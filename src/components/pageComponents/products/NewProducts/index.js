import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Carousel from '../../../common/Carousel';
import ProductList from '../../../common/ProductList';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import { USER_API, CART_API, PRODUCT_API, API } from '../../../../config';
import styles from './index.module.scss';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import useProduct from '../../../../hooks/useProduct';

const PAGE_SIZE = 10;

const NewProducts = ({ productArr, totalPages }) => {
  // productsList : [[{},{},.. ], [{},{},...],...]
  const [productsList, setProductsList] = useState([productArr]);
  const [page, setPage] = useState(1);
  const totalPageCount = useMemo(() => totalPages, [totalPages]);

  const fetcher = useCallback(async () => {
    if (page === 1) {
      setPage((prev) => prev + 1);
      return;
    }

    if (page > totalPageCount) return;

    const res = await fetchGet(
      `${API}/products?order=new&pageSize=${PAGE_SIZE}&page=${page}`
    );

    if (res.status === 204) return;

    const data = await res.json();

    setProductsList((prev) => [...prev, data.resultList]);
    setPage((prev) => prev + 1);
  }, [page, totalPageCount]);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetcher, 2000);

  const [productsArrList, toggleProductLike, addToCart] =
    useProduct(productsList);

  return (
    <>
      <article className={styles.NewProducts}>
        <Carousel />
        <div className={styles.wrapLists}>
          <div className={styles.listsContainer}>
            <p className={styles.subtitle}>따끈따끈 새로나온</p>
            <strong className={styles.title}>신상품</strong>
          </div>
          <ProductList
            productsList={productsArrList}
            toggleProductLike={toggleProductLike}
            addToCart={addToCart}
          />
        </div>
        {isFetching && <p>loading more products</p>}
      </article>
    </>
  );
};

export default NewProducts;
