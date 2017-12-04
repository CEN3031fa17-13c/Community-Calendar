'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', '$modal', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, $modal, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        // There is at least one error. Report the error and return false.
          $scope.$broadcast('show-errors-check-validity', 'userForm');
          console.log("In signup return false");

          return false;
      }
      // There is not error. Display agreement.
      $modal.open({
        templateUrl:'modules/users/client/views/authentication/term-and-condition.users.client.view.html',
        controller: 'ModalController'
      }).result.then($scope.Agree = function() {
          // The agreement was accepted.
          console.log("In signup return was valid!");

          $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
              // If successful we assign the response to the global user model
              $scope.authentication.user = response;

              // And redirect to the previous or home page
              $state.go($state.previous.state.name || 'home', $state.previous.params);
          }).error(function (response) {
              $scope.error = response.message;
          });
      }, function() {
          // Agreement Canceled.
          console.log("Cancel");
      });

      // The agreement was not accepted. Then, return false;
      // console.log("The agreement has not be accepted jet. Return false!");
      return false;
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);



angular.module('users').controller('ModalController', ['$scope', function($scope) {
}]);
