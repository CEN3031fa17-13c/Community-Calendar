'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve', '$http',
    function ($scope, $state, Authentication, userResolve, $http) {
        $scope.authentication = Authentication;
        $scope.user = userResolve;

        /* Ratio Button */
        $scope.answer = {
            decision: 'Accept Request'
        };


        $scope.remove = function (user) {
            if (confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    user.$remove();

                    $scope.users.splice($scope.users.indexOf(user), 1);
                } else {
                    $scope.user.$remove(function () {
                        $state.go('admin.users');
                    });
                }
            }
        };

        $scope.update = function (isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }

            console.log("requestSuperUser " + $scope.user.requestSuperUser);
            // Check for pending request state.
            if ($scope.user.requestSuperUser === true) {
                $scope.inSuperUser = true;
                if ($scope.answer.decision === "Accept Request") {
                    // Toggle supperUser state and change requestSuperUser to false.
                    $scope.user.superUser = !$scope.user.superUser;
                    console.log("superUser " + $scope.user.superUser);
                }
                $scope.user.requestSuperUser = false;
            }

            var user = $scope.user;
            console.log("superUser " + user.superUser);
            console.log("requestSuperUser " + user.requestSuperUser);

            user.$update(function () {
                console.log("in update " + user.superUser);
                if($scope.inSuperUser) {
                    // Send confirmation email to the user.
                    var data = ({
                        contactName: user.displayName,
                        contactEmail: user.email,
                        contactMsg: 'The Community Calendar team is glad to communicate you that your request had been processed. Go to your profile to know more details.'
                    });

                    $http.post('/api/auth/confirmation', data).success(function (data, status, headers, config) {
                        console.log('Email sent successfully!');

                        $state.go('admin.list-pending-requests', {
                            userId: user._id
                        });
                    }).error(function (data, status, headers, config) {
                        console.log('Error sending confirmation email!');
                    });
                } else {
                    $state.go('admin.users', {
                        userId: user._id
                    });
                }
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
