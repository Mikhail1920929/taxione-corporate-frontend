
const routes = [
  {
    path: '/',
    meta: {
      unAuth: true
    },
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'registration', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/policy',
    meta: {
      unAuth: true
    },
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'policy', component: () => import('pages/PrivacyPolicy.vue') }
    ]
  },
  {
    path: '/archive',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'archive', component: () => import('pages/Archive.vue') }
    ]
  },
  {
    path: '/orders',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'orders', component: () => import('pages/Orders.vue') },
      { path: 'addOrder', name: 'addOrder', component: () => import('pages/AddOrder.vue') }
    ]
  },
  {
    path: '/users',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'users', component: () => import('pages/Users.vue') },
      { path: 'add', name: 'addUsers', component: () => import('pages/AddUsers.vue') },
      { path: ':id', name: 'user', component: () => import('pages/User.vue') }
    ]
  },
  {
    path: '/settings',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'settings', component: () => import('pages/Settings.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
