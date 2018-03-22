import Vue from 'vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex';

import App from './app.vue'
import createRouter from './config/router'

Vue.use(VueRouter)

export default () => {
    const router = createRouter();
    const app = new Vue({
        router,
        render: h => h(App)
    })

    return { app, router }
}