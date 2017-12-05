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
      roles: ['*']
    });
  }
}());
