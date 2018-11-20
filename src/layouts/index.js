import styles from './index.css';
import Link from 'umi/link';

function BasicLayout(props) {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <Link className={styles.link} to="/">
          <h1 className={styles.banner}>Welcome!</h1>
        </Link>
        <Link className={styles.nav} to="/">Home</Link>
        <Link className={styles.nav} to="/martin">Martin</Link>
      </header>
      { props.children }
    </React.Fragment>
  );
}

export default BasicLayout;
