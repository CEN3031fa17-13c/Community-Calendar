'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
    function ($scope, $http, $location, Users, Authentication) {
        $scope.user = Authentication.user;
        $scope.inSuperUser = undefined;

        $scope.fillFields = function () {
            $scope.inSuperUser = true
            // If superUser is null, set it to false.
            if (!$scope.user.superUser) {
                $scope.user.superUser = false;
            }
            // If requestSuperUser is null, set it to false.
            if (!$scope.user.requestSuperUser) {
                $scope.user.requestSuperUser = false;
            }
        };

        // Update a user profile
        $scope.updateUserProfile = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }

            if ($scope.inSuperUser) {
                // Request to be a Super User or Simple User.
                $scope.user.requestSuperUser = true;
            }

            var user = new Users($scope.user);

            user.$update(function (response) {
                $scope.$broadcast('show-errors-reset', 'userForm');

                $scope.success = true;
                Authentication.user = response;
            }, function (response) {
                $scope.error = response.data.message;
            });
        };
    }
]);
