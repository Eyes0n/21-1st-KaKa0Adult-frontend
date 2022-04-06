import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

const CATEGORY_ARR = ['신규', '인기', '마이'];

const ARR = {
  new: '신규',
  hot: '인기',
  cart: '마이',
};

const PAGE_ARR = ['/products/new', '/products/hot', '/mypage/cart'];

const MainTab = () => {
  const router = useRouter();
  const { keyword, kind } = router.query;

  return (
    <div className={styles.mainTabWrap}>
      <ul className={styles.mainTabUI}>
        {CATEGORY_ARR.map((category, idx) => {
          return (
            <li className={styles.tabList} key={category}>
              <Link href={`${PAGE_ARR[idx]}`}>
                <a
                  className={
                    category === ARR[keyword || kind] ? styles.activeLink : ''
                  }
                >
                  <div className={styles.tabItem}>
                    <span
                      className={
                        category === ARR[keyword || kind]
                          ? `${styles.tabName} ${styles.active}`
                          : styles.tabName
                      }
                    >
                      {category}
                    </span>
                  </div>
                </a>
              </Link>
              <hr
                className={styles.focusUnderline}
                // className={
                //   currentId === idx
                //     ? 'focusUnderline active'
                //     : 'focusUnderline'
                // }
              ></hr>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainTab;
