export default {
  namespace: 'martin',
  state: [],
  reducers: {
    push(state, { data: data }) {
      return state.concat(data);
    },
  },
};
