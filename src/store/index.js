import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    loaded: false,
    activeUser: null,
    fromDate: '',
    toDate: '',
    projects: [],
    selectedProject: '',
    gateways: [],
    selectedGateway: '',
    filteredProjects: [], // list of filtered projects
  },
  mutations: {
    loginUser_action(state, user) {
      state.activeUser = user;
      //console.log(state.activeUser);
    },
    loaded(state) {
      state.loaded = true
    },
    //load projects for button
    populateButtons__Projects(state, projects) {
      state.projects = projects;
      //console.log(state.projects)
    },
    populateButtons__Gateways(state, gateways) {
      state.gateways = gateways;
      //console.log(state.projects)
    },
    setDate(state, newDate) {
      state.fromDate = newDate.startDate;
      state.toDate = newDate.endDate;
      console.log(state.fromDate, state.toDate);
    },
    filterProject(state, selectedProject) {
      state.selectedProject = selectedProject;
    },
    filterGateway(state, selectedGateway) {
      state.selectedGateway = selectedGateway;
    },
    loadProjects(state, newProjects) {
      state.filteredProjects = newProjects;
      console.log(state.filteredProjects);
    }
  },
  actions: {
    // display user on top right of app
    async loginUser(context) {
      let user_url = 'http://178.63.13.157:8090/mock-api/api/users'
      let user_data = await fetch(user_url)
      let user = await user_data.json()
      context.commit('loaded')
      context.commit('loginUser_action', user.data[0]);
    },
    // POST request with date range
    getReports(context) {
      axios.post('http://178.63.13.157:8090/mock-api/api/report', {
        from: this.state.fromDate,
        to: this.state.toDate,
        projectId: this.state.selectedProject.projectId,
        gatewayId : this.state.selectedGateway.gatewayId
      })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          context.commit('loadProjects', response.data.data)
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    populateButtonsAction(context) {
      /* populate Projects */
      axios.get('http://178.63.13.157:8090/mock-api/api/projects')
      .then(response => {
        //console.log(response);
        if (response.status == 200) {
          context.commit('populateButtons__Projects', response.data.data)
        }

      })
      .catch(error => console.log(error));

      /* populate Gateways */
      axios.get('http://178.63.13.157:8090/mock-api/api/gateways')
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          context.commit('populateButtons__Gateways', response.data.data)
        }

      })
      .catch(error => console.log(error));

    }
  },
  modules: {
  },
  getters: {
  }
})
