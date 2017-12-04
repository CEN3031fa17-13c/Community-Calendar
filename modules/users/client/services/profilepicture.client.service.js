'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('users').factory('ProfilePictures', ['$resource',
  function($resource) { //used to get proper S3 signature for uplaoding images
    return $resource('api/users/picture/:filename/:filetype',{ filename: '@filename',
      filetype: '@filetype'
    }, {
      upload: {
        method: 'POST'
      },
      getSig: {
        method: 'GET',
      }
    });
  }
]);
