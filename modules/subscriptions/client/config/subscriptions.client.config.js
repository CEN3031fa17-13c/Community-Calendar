(function () {
  'use strict';

  angular
    .module('subscriptions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
  }
}());
