module.exports = {
  state: {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
  },
  getters: {
    loggedIn: state => !!state.accessToken,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken
  },
  mutations: {
    LOGIN: (state, tokens) => {
      state.accessToken = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    },
    LOGOUT: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
};