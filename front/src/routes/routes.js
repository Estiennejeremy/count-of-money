import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';

import Dashboard from '@/pages/Dashboard.vue';
import UserProfile from '@/pages/UserProfile.vue';
import Signup from '@/pages/SignUp.vue';
import Signin from '@/pages/SignIn.vue';
import Admin from '@/pages/Admin.vue';
import Cryptos from '@/pages/Cryptos.vue';
import Articles from '@/pages/Articles.vue';

import Cookies from 'js-cookie';

function authGuard(to, from, next) {
  if (!Cookies.get('token')) {
    next();
  } else {
    next('/crypto');
  }
}

function guard(to, from, next) {
  if (Cookies.get('token')) {
    next();
  } else {
    next('/signin');
  }
}

//TODO : add guard to signin and signup
const routes = [
  {
    path: '/signup',
    name: 'signup',
    beforeEnter: authGuard,
    component: Signup,
  },
  {
    path: '/signin',
    name: 'signin',
    beforeEnter: authGuard,
    component: Signin,
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/cryptos',
    children: [
      {
        path: 'cryptos',
        name: 'Cryptos',
        component: Cryptos,
      },
      {
        path: 'articles',
        name: 'Articles',
        component: Articles,
      },
      {
        path: 'user',
        name: 'User Profile',
        beforeEnter: guard,
        component: UserProfile,
      },
      {
        path: 'admin',
        name: 'Admin',
        beforeEnter: guard,
        component: Admin,
      },
    ],
  },
];

export default routes;
