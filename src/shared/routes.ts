export default [
  {
    path: '/',
    name: 'home',
    component: 'page-home',
  },
  {
    path: '/education',
    name: 'education',
    component: 'page-education'
  },
  {
    path: '/history',
    name: 'history',
    component: 'page-history'
  },
  {
    path: '/projects',
    name: 'projects',
    component: 'page-projects'
  },
  {
    path: '/project/:slug',
    name: 'project',
    component: 'page-project'
  },
  {
    path: '/contact',
    name: 'contact',
    component: 'page-contact'
  },
  {
    path: '(.*)',
    redirect: '/',
    // action: () => { this.page = 'home'; }
  }
]
