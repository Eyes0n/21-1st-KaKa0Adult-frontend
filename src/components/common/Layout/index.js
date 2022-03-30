import styles from './index.module.scss';

const Layout = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Layout;
