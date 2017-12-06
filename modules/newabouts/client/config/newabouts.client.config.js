(function () {
  'use strict';

  angular
    .module('newabouts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'About',
      state: 'about-view',
      //state: 'about-create',     // This has to be enable if the first About object want to be created in the DB.
      roles: ['*']
    });
  }
}());
