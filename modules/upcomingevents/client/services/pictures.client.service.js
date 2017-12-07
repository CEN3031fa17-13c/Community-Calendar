'use strict';

// Categories service used to communicate Categories REST endpoints
angular.module('upcomingevents').factory('Pictures', ['$resource',
  function($resource) {
    return $resource('api/upcomingevents/picture/:filename/:filetype',{ filename: '@filename',
      filetype: '@filetype'
    }, {
      upload: {//unused endpoint
        method: 'POST'
      },
      getSig: {//used to get signed request from server side
        method: 'GET',
      }
    });
  }
]);
