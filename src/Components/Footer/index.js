import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowIconOn: false,
    };
  }

  toggleArrowIcon = () => {
    this.setState({
      arrowIconOn: !this.state.arrowIconOn,
    });
  };

  render() {
    const { arrowIconOn } = this.state;

    return (
      <div className={styles.Footer}>
        <section className={styles.footerWrap}>
          <div className={styles.footerContainer}>
            <div className={styles.infoSection}>
              <Link href="/" className={styles.infoLink}>
                <a>제휴문의</a>
              </Link>
              <Link href="/" className={styles.infoLink}>
                <a>고객문의</a>
              </Link>
              <Link href="/" className={styles.infoLink}>
                <a>이용약관</a>
              </Link>
              <Link href="/" className={styles.infoLink}>
                <a>개인정보처리방침</a>
              </Link>
              <Link href="/" className={styles.infoLink}>
                <a>지식재산권보호센터</a>
              </Link>
            </div>
            <div className={styles.companySection}>
              <div className={styles.logoToggle}>
                <span className={styles.logo}>
                  kakao<span className={styles.bold}>petshop</span>
                </span>
                <span
                  className={
                    arrowIconOn
                      ? `${styles.logoToggleIcon} ${styles.active}`
                      : styles.logoToggleIcon
                  }
                  onClick={this.toggleArrowIcon}
                />
              </div>
            </div>
            {arrowIconOn && (
              <div className={styles.companyInfoSection}>
                <div class={styles.title}>
                  <span className={styles.companyInfo}>(주)그레이스풀레인</span>
                  <span className={styles.companyInfo}>주소</span>
                  <span className={styles.companyInfo}>사업자등록번호</span>
                  <span className={styles.companyInfo}>호스팅서비스사업자</span>
                  <span className={styles.companyInfo}>이메일</span>
                  <span className={styles.companyInfo}>고객센터</span>
                </div>
                <div className={styles.para}>
                  <span className={styles.companyInfo}>대표이사 송은우</span>
                  <span className={styles.companyInfo}>
                    서울특별시 강남구 테헤란로 427, 위워크타워
                  </span>
                  <span className={styles.companyInfo}>530-81-01310</span>
                  <span className={styles.companyInfo}>(주)그레이스풀레인</span>
                  <span className={styles.companyInfo}>
                    store@kakaopetshop.com
                  </span>
                  <span className={styles.companyInfo}>1577-6263</span>
                  <span className={styles.companyInfo}>
                    전화상담 (평일 10:00~18:00)
                  </span>
                  <span className={styles.companyInfo}>
                    카카오톡 상담 (평일 10:00~18:00)
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
