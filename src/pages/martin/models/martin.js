export default {
  // namespace: 'martin',
  state: [1,2,3],
  reducers: {
    push(state, { data: data }) {
      return state.concat(data);
    },
  },
};
