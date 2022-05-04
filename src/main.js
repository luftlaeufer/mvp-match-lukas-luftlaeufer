import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Datepicker from '@vuepic/vue-datepicker';
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(store).use(VueAxios, axios).use(Datepicker).mount('#app')
