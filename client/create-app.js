import Vue from 'vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import Meta from 'vue-meta'
import App from './app.vue'
import createRouter from './config/router'
import createStore from './store/create-store'
import ElementUI from 'element-ui';
import { sync } from 'vuex-router-sync'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Meta)

export default () => {
    const router = createRouter();
    const store = createStore();
    // 同步路由状态到store
    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#root')

    return { app, router, store }
}
