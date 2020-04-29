const doscgRoutes = [
  {
    path: '/',
    name: 'Home',
    icon: 'file-text',
    header: 'Custom',
    // create a container component
    component: {
      render (c) {
        return c('router-view')
      }
    },
    // Lazy load pages by path
    children: [
      {
        path: '',
        name: 'CV',
        component: () => import('./views/pages/cv')
      },
      {
        path: 'xyz',
        name: 'XYZ',
        component: () => import('./views/pages/xyz')
      },
      {
        path: 'bc',
        name: 'BC',
        component: () => import('./views/pages/bc')
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('./views/pages/map')
      }
    ]
  }
]

export { doscgRoutes }
