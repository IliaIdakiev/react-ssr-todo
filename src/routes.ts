import Home from './Home/Home';
import About from './About/About';
import NotFound from './NotFound';

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
    component: NotFound
  }
];

export { routes };