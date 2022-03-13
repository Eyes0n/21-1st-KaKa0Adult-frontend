import Link from 'next/link';
import styles from './index.module.scss';
import { useRouter } from 'next/router';

const SUB_ARR = [
  { name: '찜하다', params: 'wish' },
  { name: '장바구니', params: 'cart' },
  { name: '주문내역', params: 'orderlist' },
];

const LINK_OBJ = {
  찜하다: 'wish',
  장바구니: 'cart',
  주문내역: 'orderlist',
};

const SubTab = () => {
  const router = useRouter();
  const { keyword } = router.query;

  return (
    <div className={styles.subTab}>
      <ul className={styles.tabLists}>
        {SUB_ARR.map((ele) => (
          <Link href={`/mypage/${LINK_OBJ[ele.name]}`}>
            <a
              className={`${styles.tabList} ${
                ele.params === keyword ? styles.active : ''
              }`}
            >
              {ele.name}
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SubTab;
