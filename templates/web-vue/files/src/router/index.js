import Vue from 'vue';
import Router from 'vue-router';
import PageMain from '@/pages/main/main_page';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: PageMain,
  },
];

export default new Router({ routes });
