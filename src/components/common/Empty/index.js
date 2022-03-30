import Link from 'next/link';
import styles from './index.module.scss';

const Empty = ({ message, link }) => {
  return (
    <div className={styles.myPage}>
      <div className={styles.contents}>
        <div className={styles.emptyBasket}>
          <div className={styles.emptyImg}></div>
          <div className={styles.emptyMsg}>
            {message[0]}
            <br />
            {message[1]}
          </div>
          <Link href={link.url}>
            <a className={styles.linkToHot}>
              <span className={styles.linkTitle}>{link.text}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Empty;
