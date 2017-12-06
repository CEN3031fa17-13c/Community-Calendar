(function () {
  'use strict';

  angular
    .module('contacts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: '/contact',
        // template: '<ui-view/>'
        templateUrl: 'modules/contacts/client/views/view-contact.client.view.html'
      });
  }
}());
