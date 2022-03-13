import React, { Component } from 'react';
import InnerCarousel from './InnerCarousel';
import Nav from '../../Components/Nav';
import { fetchGet, fetchPost } from '../../utils/fetches';
import { API } from '../../config';
import styles from './index.module.scss';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      isOpen: false,
      count: 0,
      isInfo: false,
      isDelevery: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetchGet(`${API}/products/${match.params.id}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          product: result,
        });
      });
  }

  toggleTargetOpen = (target) => {
    this.setState({ [target]: !this.state[target] });
  };

  minusPlusCount = (e) => {
    const { count } = this.state;
    const { id } = e.target;

    if (id === 'minus') {
      if (count > 0) this.setState({ count: count - 1 });
    } else {
      this.setState({ count: count + 1 });
    }
  };

  submitCart = (productId, boolPost) => {
    const { count, product } = this.state;

    if (!boolPost && count > 0) {
      fetchPost(`${API}/orders/order-items`, {
        product_id: productId,
        count,
      }).then((res) => {
        res.ok ? alert('Add to Cart Success') : alert('Add to Cart Fail');
      });

      this.setState({
        product: { ...product, cart: !product.cart },
      });
    }
  };

  render() {
    const { product, isInfo, isDelevery, count } = this.state;

    const starPoint = Math.floor(Number(product.starPoint));
    const starArr = Array(5)
      .fill(1)
      .map((el, i) => el + i);

    return (
      <main>
        <Nav />
        <div className={styles.detailWrap}>
          <InnerCarousel imgData={product} />
          <div className={styles.detailHeader}>
            <h2 className={styles.detailTitle}>{product.name}</h2>
            <p className={styles.detailPrice}>
              <span>{product.price}</span>원
            </p>
            <div className={styles.starGrade}>
              {starArr.map((star) =>
                star < starPoint ? (
                  <span
                    key={star}
                    className={`${styles.star} ${styles.starOn}`}
                  ></span>
                ) : (
                  <span key={star} className={styles.star}></span>
                ),
              )}
            </div>
          </div>
          <img
            className={styles.detailContent}
            src={product.content}
            alt={product.name}
          />
          <div className={styles.detailBottom}>
            <div
              className={styles.detailInfo}
              onClick={() => this.toggleTargetOpen('isInfo')}
            >
              <span className={styles.boldTxt}>세부정보</span>
              <button type="button" className={styles.infoBtn}></button>
            </div>
            {isInfo && (
              <ul className={styles.infoUl}>
                <li className={styles.infoLi}>
                  품명 및 모델명 : {product.name}&nbsp;1111111111111
                </li>
                <li className={styles.infoLi}>
                  KC 인증필 유무 : CB111R1111-1111
                </li>
                <li className={styles.infoLi}>치수 : 약 11*11*11cm, 11g</li>
                <li className={styles.infoLi}>색상 : 오렌지&nbsp;외</li>
                <li className={styles.infoLi}>
                  재질 : [표면] 폴리에스터 96%, 폴리우레탄 4% / [솜] 폴리에스터
                  100%
                </li>
                <li className={styles.infoLi}>사용연령 : 만 3세 이상</li>
                <li className={styles.infoLi}>동일모델의 출시년월 : 0000.00</li>
                <li className={styles.infoLi}>제조자 : ㈜Pet Shop</li>
                <li className={styles.infoLi}>제조국 : 중국</li>
                <li className={styles.infoLi}>
                  취급 시 주의사항
                  <br />
                  1) 포장은 반드시 부모님(보호자)께서 개봉해 주시고 분리수거해
                  주십시오.
                  <br />
                  2) 제품 용도 이외에는 사용하지 마십시오.
                  <br />
                  3) 입에 넣고 물거나 빨지 않도록 주의하십시오.
                  <br />
                  4) 불에 직접 닿거나 가까이하지 마십시오.
                  <br />
                  5) 세탁기 사용을 금하고 손으로 세탁하여 주십시오.
                  <br />
                  6) 물에 젖을 경우 그늘에서 말려 주십시오.
                </li>
                <li className={styles.infoLi}>
                  품질보증 기준 : 본 제품은 공정거래위원회 고시 소비자
                  분쟁해결기준에 의거 교환 및 보상을 받으실 수 있습니다.
                </li>
                <li className={styles.infoLi}>
                  A/S 책임자와 전화번호 : 고객센터 1234-1234
                </li>
              </ul>
            )}
            <div
              className={styles.delevery}
              onClick={() => this.toggleTargetOpen('isDelevery')}
            >
              <span className={styles.boldTxt}>배송반품</span>
              <button type="button" className={styles.downUpArrow}></button>
            </div>
            {isDelevery && (
              <ul className={styles.infoUl}>
                <strong className={styles.deleveryTxt}>배송</strong>
                <li className={styles.infoLi}>
                  <span className="">배송사 : CJ대한통운</span>
                </li>
                <li className={styles.infoLi}>
                  <span className="">
                    배송비 : 국내 3,000원 (3만 원 이상 구매 시 무료배송)
                  </span>
                </li>
                <li className={styles.infoLi}>
                  <span className="">
                    오후 3시 이전 결제 완료 주문건은 당일 출고, 오후 3시 이후
                    주문 건은 익일 출고됩니다.
                    <br />
                    출고 이후 영업일 기준 평균 3일 이내 제품을 수령하실 수
                    있습니다.
                    <br />
                    단, 제품의 재고 상황, 배송량, 배송 지역에 따라 배송기일이
                    추가로 소요될 수 있는 점 양해 부탁드립니다
                  </span>
                </li>
              </ul>
            )}
          </div>
          <div className={styles.inquire}>
            <button className={styles.inquireBtn}>
              <span className={styles.boldTxt}>실시간 문의</span>
              <span className={`${styles.counselBtn} ${styles.boldTxt}`}>
                상담하기
              </span>
            </button>
          </div>

          <div className={styles.purchase}>
            <div className={styles.purchaseContent}>
              <p>장바구니</p>

              <div className={styles.addOrMinus}>
                <div>
                  <span
                    className={styles.calculation}
                    id="minus"
                    onClick={this.minusPlusCount}
                  >
                    -
                  </span>
                  <span>{count}</span>
                  <span
                    className={styles.calculation}
                    id="plus"
                    onClick={this.minusPlusCount}
                  >
                    +
                  </span>
                </div>
              </div>

              <i
                className={`fas fa-shopping-cart ${styles.detailCartBtn}`}
                onClick={() => this.submitCart(product.id, product.cart)}
              ></i>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Detail;
