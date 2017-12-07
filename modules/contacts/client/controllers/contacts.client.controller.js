(function () {
    'use strict';

    // Contacts controller
    angular
        .module('contacts')
        .controller('ContactsController', ContactsController);

    ContactsController.$inject = ['$scope', '$state', '$window', '$http'/*, 'Authentication', 'contactResolve'*/];

    function ContactsController($scope, $state, $window, $http/*, Authentication, contact*/) {
        /** Guangyu: contact email controller */
        $scope.contactform = function (isValid) {
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }
            // Object with viewer contact information (Name, email, and messages).
            var data = ({
                contactName: $scope.userForm.firstName.$$rawModelValue,
                contactEmail: $scope.userForm.email.$$rawModelValue,
                contactMsg: $scope.userForm.message.$$rawModelValue
            });

            $http.post('/api/auth/contacts', data).success(function (data, status, headers, config) {
                console.log(1);
                $state.go($state.previous.state.name || 'home', $state.previous.params);
            }).error(function (data, status, headers, config) {
                console.log(0);
            });
            //end of contact email controller

        };
    }
}());
