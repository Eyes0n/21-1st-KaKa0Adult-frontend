import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

const CATEGORY_ARR = ['신규', '인기', '마이'];

const ARR = {
  '/products/new': '신규',
  '/products/hot': '인기',
  '/mypage/[keyword]': '마이',
};

const PAGE_ARR = ['/products/new', '/products/hot', '/mypage/cart'];

const MainTab = () => {
  const router = useRouter();
  const { route } = router;
  return (
    <div className={styles.mainTabWrap}>
      <ul className={styles.mainTabUI}>
        {CATEGORY_ARR.map((category, idx) => {
          return (
            <li className={styles.tabList} key={category}>
              <Link href={`${PAGE_ARR[idx]}`}>
                <a className={category === ARR[route] ? styles.activeLink : ''}>
                  <div className={styles.tabItem}>
                    <span
                      className={
                        category === ARR[route]
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
