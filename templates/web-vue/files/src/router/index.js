import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/home_page';
import About from '@/pages/about/about_page';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

export default new Router({ routes });
