import axios from 'axios';

const UserModule = {
  state: {
    user: null,
    location: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    APPLY_USER: (state, user) => state.user = user
  },
  actions: {
    applyUser: ({ commit }) => {
      axios.post('/api/home/apply-user')
        .then(user => commit('APPLY_USER', user.data));
    }
  }
};

export default UserModule;

