Package.describe({
  name: "sunny-g:meteor-famous-ui-components",
  summary: "A set of fancy UI components - implemented in Famo.us, packaged for Meteor",
  version: "0.0.1",
  git: "https://github.com/sunny-g/meteor-famous-ui-components"
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'gadicohen:famous',
    'gadicohen:famous-views@1.2.0'
  ]);

  // TODO: is implying necessary for devs to get access to famo.us?
  //api.imply([
  //  ''
  //]);

  // COMPONENTS
  // TODO: add to server?
  api.addFiles([
    'lib/client/HeaderSwiper/HeaderSwiper.js',
    'lib/client/HeaderSwiper/HeaderSwiperElement.js'
  ], ['client']);

  // TODO: export to server?
  api.export([
    'HeaderSwiper',
    'HeaderSwiperElement'
  ], ['client']);

});