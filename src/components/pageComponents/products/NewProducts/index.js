import React, { useState, useEffect } from 'react';
import Carousel from '../../../common/Carousel';
import ProductList from '../../../common/ProductList';
import Nav from '../../../common/Nav';
import MainTab from '../../../common/MainTab';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import { USER_API, CART_API, PRODUCT_API } from '../../../../config';
import styles from './index.module.scss';

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // infinteScroll
  // 무한 스크롤 구현시 page에 대한 정보가 products데이더를 불러올 때
  // products데이테어 포함되어 불러오고 있다.
  // public/data/newProductsData.json을 보고 어떻게 구현할지 고려하기

  // componentDidMount() {
  //   const { match, location } = this.props;
  //   const newMatch = matchParser(match.path);
  //   console.log('newMatch', newMatch);
  //   console.log('url', `${PRODUCT_API}/products/${newMatch}`);
  //   console.log('location', location);

  //   const res = !location.search
  //     ? fetchGet(`${PRODUCT_API}/products?order=new`)
  //     : fetchGet(`${PRODUCT_API}/products/${newMatch}/${location.search}`);

  //   res
  //     .then((res) => res.json())
  //     .then((products) => {
  //       this.setState({
  //         products: products.resultList,
  //       });
  //     });
  // }

  // componentDidUpdate() {
  //   //TODO: 무한 스크롤을 위한 '/products?type=new' 추가 데이터
  //   스크롤 좌표에 따라 fetch url 수정
  //   const { products, page } = this.state;
  //   const { match, location } = this.props;
  //   const arr = match.split('/');
  //   const lastPath = arr[arr.length - 1];
  //   const res = location.search
  //     ? fetchGet(
  //         `${API}/products?order=${lastPath}&pageSize=${20}&page=${page + 1}`,
  //       )
  //     : fetchGet(
  //         `${API}${match.path}${location.search}&pageSize=${20}&page=${
  //           page + 1
  //         }`,
  //       );
  //   res
  //     .then((res) => res.json())
  //     .then((newProducts) => {
  //       this.setState({
  //         products: products.concat(newProducts),
  //         page: page + 1,
  //       });
  //     })
  //     .catch((error) => console.log(error.message));
  // }

  useEffect(() => {
    // fetchGet(`${PRODUCT_API}/products?order=new&pageSize=16&page=${page}`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     this.setState({
    //       products: result.resultList,
    //     });
    //   });

    fetchGet('http://localhost:3000/data/newProductsData.json')
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.resultList);
      });
  }, [page]);

  return (
    <>
      <Nav />
      <article className={styles.NewProducts}>
        <MainTab />
        <Carousel />
        <div className={styles.wrapLists}>
          <div className={styles.listsContainer}>
            <p className={styles.subtitle}>따끈따끈 새로나온</p>
            <strong className={styles.title}>신상품</strong>
          </div>
          <ProductList products={products} />
        </div>
      </article>
    </>
  );
};

export default NewProducts;
