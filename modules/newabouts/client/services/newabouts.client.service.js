// Newabouts service used to communicate Newabouts REST endpoints
(function () {
  'use strict';

  angular
    .module('newabouts')
    .factory('NewaboutsService', NewaboutsService);

  NewaboutsService.$inject = ['$resource'];

  function NewaboutsService($resource) {  //returns resource object
    return $resource('api/newabouts/:newaboutId', {
      newaboutId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      query: {method: 'GET', isArray: true}
    });
  }
}());
