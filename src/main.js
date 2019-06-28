// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global_ from './components/Global/global'
import Header from '@/components/header'
import Index from '@/components/index'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap'
import VueQuillEditor from 'vue-quill-editor'
import jQuery from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

global.jQuery = jQuery
global.$ = jQuery

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$GLOBAL = global_;

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.component('Header', Header)
Vue.component('Index', Index)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})