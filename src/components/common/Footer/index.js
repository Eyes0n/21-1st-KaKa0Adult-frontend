import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.loginFooter}>
        <div className={styles.serviceInfo}>
          <Link href="/">
            <a className={styles.linkInfo}>이용약관</a>
          </Link>
          <Link href="/">
            <a className={`${styles.linkInfo} ${styles.linkPolicy}`}>
              개인정보 처리방침
            </a>
          </Link>
          <Link href="/">
            <a className={styles.linkInfo}>운영정책</a>
          </Link>
          <Link href="/">
            <a className={styles.linkInfo}>고객센터</a>
          </Link>
          <Link href="/">
            <a className={styles.linkInfo}>공지사항</a>
          </Link>
        </div>
        <small className={styles.txtCopyright}>
          Copyright ©
          <Link href="/">
            <a className={styles.linkPet}>Pet Shop Corp.</a>
          </Link>
          All rights reserved.
        </small>
      </footer>
    );
  }
}

export default Footer;
