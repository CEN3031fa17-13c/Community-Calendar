'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader', 'ProfilePictures', '$resource', '$http', 'Users',
    function ($scope, $timeout, $window, Authentication, FileUploader, ProfilePictures, $resource, $http, Users) {
      $scope.authentication = Authentication; 
      $scope.user = Authentication.user;
      $scope.imageURL = $scope.user.profileImageURL;
      var user = new Users($scope.user);
      $scope.sizecheck = -1;
      $scope.display = Authentication.user.profileImageURL;

      $scope.s3upload = function(){ 
        $scope.sizecheck = -1;
        if ($scope.file.size > 5000000){  //check size before uploading and exit if its too big
          $scope.sizecheck = 1;
          return -1;
        }
        var check = ProfilePictures.getSig({filename: $scope.file.name, filetype: $scope.file.type}).$promise.then(function(data){
          const xhr = new XMLHttpRequest();
          xhr.open('PUT', data.signedRequest);
          xhr.onreadystatechange = () => {  //async send to S3
            if(xhr.readyState === 4){
              if(xhr.status === 200){
                $scope.imageURL = data.url;
                $scope.user.profileImageURL = data.url;
                $scope.display = data.url;
                $scope.$apply();
              }
              else{
                alert('Could not upload file.');
              }
            }
          };
        xhr.send($scope.file);            
        user.profileImageURL = data.url;
          user.$update(function (response) {
            $scope.$broadcast('show-errors-reset', 'userForm');

            $scope.success = true;
            Authentication.user = response;
            }, function (response) {
            $scope.error = response.data.message;
          });
        });
      }
    }
])
.directive('file', function() { //creates easy to use $scope.file object to use for image uploads
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function($scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        $scope.file = file;
        $scope.$parent.file = file;
        $scope.$apply();
      });
    }
  };
});
