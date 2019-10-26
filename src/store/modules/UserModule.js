import axios from 'axios';

const UserModule = {
  state: {
    user: null,
    location: null
  },
  getters: {

  },
  mutations: {
    APPLY_USER: (state, user) => state.user = user
  },
  actions: {
    applyUser: ({ commit }) => {
      getCurrentPosition()
        .then(pos => axios.post('/api/home/apply-user', pos))
        .then(res => console.log(res));
    }
  }
};

export default UserModule;

const getCurrentPosition = () => new Promise((resolve) => {
  if (!("geolocation" in navigator)) resolve(null);
  let options = { enableHighAccuracy: true };
  navigator.geolocation.getCurrentPosition(pos => resolve([pos.coords.latitude, pos.coords.longitude]),
                                            () => resolve(null), options);
});