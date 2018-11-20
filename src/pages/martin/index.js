import { connect } from 'dva';

function Page({ dispatch, martin }) {
  function push(){
    dispatch({ type: 'martin/push', data: martin.length + 1 });
  }
  return (
    <div style={{padding: "2rem"}}>
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
