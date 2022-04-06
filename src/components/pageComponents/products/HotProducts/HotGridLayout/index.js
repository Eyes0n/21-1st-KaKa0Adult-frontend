import styles from './index.module.scss';

const HotGridLayout = ({ children }) => {
  return <div className={styles.gridContainer}>{children}</div>;
};

export default HotGridLayout;
