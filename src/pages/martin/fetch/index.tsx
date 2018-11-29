import { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.css';

@connect(states => {
  return {
    'martin/fetch': states['martin/fetch']
  };
})
class Page extends Component<any> {
  render(){
    return (
      <div className={styles.frame}>
        <div>
          Model Data: { this.props['martin/fetch'] }
        </div>
        <Button.Group>
          <Button onClick={ () => { this.rand(); } }>Rand Model Data</Button>
          <Button onClick={ () => { this.props.dispatch({ type: 'martin/fetch/fetch' }); } }>Fetch Model Data</Button>
        </Button.Group>
      </div>
    );
  }

  rand(){
    this.props.dispatch({ type: 'martin/fetch/rand' });
  }
}

export default Page;
