(function () {
  'use strict';

  angular
    .module('contacts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set Contact as top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Contact',
      state: 'contacts',
      roles: ['*']
    });
  }
}());
