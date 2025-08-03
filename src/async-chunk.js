import loadable from '@loadable/component';


loadable(
  () => import('./inside-async-chunk'),
);