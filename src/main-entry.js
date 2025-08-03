import loadable from '@loadable/component';


loadable(
  () =>
    import(
      './async-chunk'
    )
);