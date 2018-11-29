import api from '@/services/api';

export default {
  namespace: 'martin/fetch',
  state: 'model of martin/fetch',
  reducers: {
    rand(state, action) {
      return 'model of martin/fetch: ' + (action.data ? JSON.stringify(action.data) : Math.random());
    },
  },
  effects: {
    *fetch(action, effects) {
      const response = yield effects.call(api.get, '/api/fetch', {});
      yield effects.put({
        type: 'rand',
        data: response.data.data
      });
    }
  },
};
