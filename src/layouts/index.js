import { Fragment } from 'react';
import Link from 'umi/link';
import styles from './index.css';

function BasicLayout(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <Link className={styles.link} to="/">
          <h1 className={styles.banner}>Welcome!</h1>
        </Link>
        <Link className={styles.nav} to="/">Home</Link>
        <Link className={styles.nav} to="/martin">Martin</Link>
        <Link className={styles.nav} to="/martin/fetch">Fetch</Link>
      </header>
      { props.children }
    </Fragment>
  );
}

export default BasicLayout;
