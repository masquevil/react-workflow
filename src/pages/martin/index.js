import styles from './index.css';
import { connect } from 'dva';
// import { Button } from 'antd';

function Page({ dispatch, martin }) {
  function push(){
    dispatch({ type: 'martin/push', data: martin.length + 1 });
  }
  return (
    <div className={styles.frame}>
      <div>
        List of Data:
        <button onClick={push}>Push</button>
      </div>
      <ul>
        {
          martin.map((data, index) => (
            <li key={index}>
              {data}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default connect(({ martin }) => ({ martin }))(Page);
