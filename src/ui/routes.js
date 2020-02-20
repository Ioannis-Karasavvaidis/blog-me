import Hello from 'pages/Hello.vue';

const routes = [
  { path: '/hello', name: 'hello', component: Hello },
  {
    path: '/bye',
    name: 'bye',
    component: Hello,
  },
  { path: '', name: 'default' },
];

export default {
  routes,
};
