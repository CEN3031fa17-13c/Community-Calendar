(function () {
  'use strict';

  angular
    .module('contacts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Contact',
      state: 'contacts',
      // type: 'dropdown',
      roles: ['*']
    });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'contacts', {
    //   title: 'List Contacts',
    //   state: 'contacts.list'
    // });
    //
    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'contacts', {
    //   title: 'Create Contact',
    //   state: 'contacts.create',
    //   roles: ['user']
    // });
  }
}());
