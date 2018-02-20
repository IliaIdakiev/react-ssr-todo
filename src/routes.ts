import Home from './Home/Home';
import About from './About/About';
import NotFound from './NotFound';
import Update from './Update/Update';

const routes: any[] = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/edit/:id',
    component: Update
  },
  {
    path: '/add',
    component: Update
  },
  {
    component: NotFound
  }
];

const paths = routes.map(r => r.path);

export { routes, paths };