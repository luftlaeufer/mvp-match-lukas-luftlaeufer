import { createStore } from 'vuex'

export default createStore({
  state: {
    loaded: false,
    activeUser: null,
    fromDate: '',
    toDate: '',
    projects: [],
    gateways: [],
  },
  mutations: {
    loginUser_action(state, user) {
      state.activeUser = user;
      //console.log(state.activeUser);
    },
    loaded(state) {
      state.loaded = true
    },
    setDate(state, newDate) {
      state.fromDate = newDate.startDate;
      state.toDate = newDate.endDate;
      console.log(state.fromDate, state.toDate);
    },
  },
  actions: {
    async loginUser(context) {
      let user_url = 'http://178.63.13.157:8090/mock-api/api/users'
      let user_data = await fetch(user_url)
      let user = await user_data.json()
      context.commit('loaded')
      context.commit('loginUser_action', user.data[0]);
    }
  },
  modules: {
  },
  getters: {
    getUser(state) {
      return state.activeUser;
    }
  }
})
