import VueI18Next from '@panter/vue-i18next';
import HelloWebpack from 'pages/Hello.vue';
import routes from 'routes';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import i18nextInit from './i18n';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes.routes,
});

Vue.use(VueResource);
// Vue.use(Store)

Vue.use(VueI18Next);
const i18next = i18nextInit();
const i18n = new VueI18Next(i18next);

Vue.mixin({
  methods: {
    _veryUsefulMethod() {
      console.log('I am a global mixin. I should be used across the app.');
    },
  },
});

new Vue({
  i18n: i18n,
  el: '#root',
  router,
  name: 'Blog Me',
  render: h => h(HelloWebpack),
  methods: {
    _someMethodYouWant() {
      console.log('Any method that you want to have!');
    },
  },
  created() {
    console.log('App created....');
  },
});
