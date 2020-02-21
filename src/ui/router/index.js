import Hello from 'views/Hello.vue';

const routes = [
  { path: '/hello', name: 'hello', component: Hello },
  { path: '', name: 'default' },
];

export default {
  routes,
};
