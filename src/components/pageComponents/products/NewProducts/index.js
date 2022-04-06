import React, { useState, useEffect } from 'react';
import Carousel from '../../../common/Carousel';
import ProductList from '../../../common/ProductList';
import Nav from '../../../common/Nav';
import MainTab from '../../../common/MainTab';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import { USER_API, CART_API, PRODUCT_API } from '../../../../config';
import styles from './index.module.scss';

const NewProducts = ({ products }) => {
  const [productsList, setProductsList] = useState([products]);
  const [page, setPage] = useState(1); // infinteScroll

  useEffect(() => {
    // fetchGet(`${PRODUCT_API}/products?order=new&pageSize=16&page=${page}`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setProductsList((prev) => [...prev, result.resultList]);
    //   });
  }, [page]);

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
