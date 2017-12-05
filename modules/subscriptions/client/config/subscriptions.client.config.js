(function () {
  'use strict';

  angular
    .module('subscriptions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Subscriptions',
    //   state: 'subscriptions',
    //   type: 'dropdown',
    //   roles: ['*']
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'subscriptions', {
    //   title: 'List Subscriptions',
    //   state: 'subscriptions.list'
    // });
    //
    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'subscriptions', {
    //   title: 'Create Subscription',
    //   state: 'subscriptions.create',
    //   roles: ['user']
    // });
  }
}());
