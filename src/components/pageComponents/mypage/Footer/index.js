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
              <Link href="/">
                <a className={styles.infoLink}>제휴문의</a>
              </Link>
              <Link href="/">
                <a className={styles.infoLink}>고객문의</a>
              </Link>
              <Link href="/">
                <a className={styles.infoLink}>이용약관</a>
              </Link>
              <Link href="/">
                <a className={styles.infoLink}>개인정보처리방침</a>
              </Link>
              <Link href="/">
                <a className={styles.infoLink}>지식재산권보호센터</a>
              </Link>
            </div>
            <div className={styles.companySection}>
              <div className={styles.logoToggle}>
                <span className={styles.logo}>
                  kokoo<span className={styles.bold}>petshop</span>
                </span>
                <span
                  className={
                    arrowIconOn
                      ? styles.logoToggleIcon
                      : `${styles.logoToggleIcon} ${styles.active}`
                  }
                  onClick={this.toggleArrowIcon}
                />
              </div>
            </div>
            {arrowIconOn && (
              <div className={styles.companyInfoSection}>
                <div className={styles.title}>
                  <span className={styles.companyInfo}>(주)XXXXX</span>
                  <span className={styles.companyInfo}>주소</span>
                  <span className={styles.companyInfo}>사업자등록번호</span>
                  <span className={styles.companyInfo}>호스팅서비스사업자</span>
                  <span className={styles.companyInfo}>이메일</span>
                  <span className={styles.companyInfo}>고객센터</span>
                </div>
                <div className={styles.para}>
                  <span className={styles.companyInfo}>대표이사 xxx</span>
                  <span className={styles.companyInfo}>
                    서울특별시 강남구 테헤란로 xxx, xxxxx타워
                  </span>
                  <span className={styles.companyInfo}>530-81-01310</span>
                  <span className={styles.companyInfo}>(주)XXXXX</span>
                  <span className={styles.companyInfo}>
                    store@kokoopetshop.com
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
