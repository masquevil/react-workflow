// 如果要用 ant design，需要全局优先引入 ant design 的通用样式。取消注释掉下面这一行
// import 'antd/es/style/index';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    initialState: {
      martin: [3,2,1],
    },
  },
};
