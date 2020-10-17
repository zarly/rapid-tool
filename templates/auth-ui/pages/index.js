import SignIn from './signin/signin';
import SignUp from './signup/signup';
import Forget from './forget/forget';
import Layout from './layout/layout';

export const routes = [
  {
    path: 'signin',
    component: SignIn,
  },
  {
    path: 'signup',
    component: SignUp,
  },
  {
    path: 'forget',
    component: Forget,
  },
];

export default function (path) {
    return {
        path,
        component: Layout,
        children: routes,
    };
};
