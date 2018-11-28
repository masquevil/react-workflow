import { Component } from 'react';
import { connect } from 'dva';
import styles from './index.css';

@connect(states => ({
  martin: states.martin
}))
class Page extends Component {
  render() {
    const { martin } = this.props;
    return (
      <div className={styles.frame}>
        <div>
          List of Data:
          <button onClick={ e => { this.push(); } }>Push</button>
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

  push(){
    const { dispatch, martin } = this.props;
    dispatch({ type: 'martin/push', data: martin.length + 1 });
  }
}

export default Page;
