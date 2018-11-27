
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'demo-umi',
      dll: true,
      routes: {
        exclude: [
          /models\//,
          /components\//,
          /services\//,
          /utils\//,
        ],
      },
      hardSource: true,
    }],
  ],
  hash: true,
}
