import VueI18Next from '@panter/vue-i18next';
import App from 'App.vue';
import KeenUI from 'keen-ui';
import routes from 'router';
import log from 'shared/log';
import store from 'store';
import i18nextInit from 'utils/i18n';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

import 'keen-ui/dist/keen-ui.css';
import 'app.scss';

window.LOGGING = Boolean(process.env.LOGGING);

const i18next = i18nextInit();
Vue.use(VueI18Next);
const i18n = new VueI18Next(i18next);
Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes.routes,
});

router.beforeEach((to, from, next) => {
  next();
});

Vue.use(VueResource);

Vue.use(store);

Vue.mixin({
  methods: {
    _veryUsefulMethod() {
      console.log('I am a global mixin. I should be used across the app.');
    },
  },
});

Vue.use(KeenUI);

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

i18next.on('initialized', function() {
  new Vue({
    i18n: i18n,
    el: '#root',
    router,
    store,
    name: 'Blog Me',
    render: h => h(App),
    methods: {
      _someMethodYouWant() {
        log('Any method that you want to have!');
      },
    },
    created() {
      log('App created....');
    },
  });
});
