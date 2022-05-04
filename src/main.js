import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Datepicker from '@vuepic/vue-datepicker';

createApp(App).use(store).use(Datepicker).mount('#app')
