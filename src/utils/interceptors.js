const axios = require('axios');
const store = require('../store/index').default;
const router = require('../router/index').default;

export const requestHandler = req => {
  if (isApiRequest(req.url))
    req.headers.authorization = store.getters.accessToken;
  return req;
};

export const responseErrorHandler = res => new Promise((resolve, reject) => {

  if (!isApiRequest(res.config.url) || res.response.data.reason !== 'token expired')
    return reject(res);

  axios.post('/auth/refresh-tokens', {refreshToken: store.getters.refreshToken })
  .then(ref => {
    store.commit('LOGIN', ref.data);
    axios(res.config)
    .then(res => resolve(res))
    .catch(() => {
      store.commit('LOGOUT');
      router.push('/auth');
    });
  })
  .catch(() => {
    store.commit('LOGOUT');
    router.push('/auth');
  });
});

const isApiRequest = (url) => /^\/api/.test(url);