(function () {
    'use strict';

    // Contacts controller
    angular
        .module('contacts')
        .controller('ContactsController', ContactsController);

    ContactsController.$inject = ['$scope', '$state', '$window', '$http'/*, 'Authentication', 'contactResolve'*/];

    function ContactsController($scope, $state, $window, $http/*, Authentication, contact*/) {
        // var vm = this;
        //
        // vm.authentication = Authentication;
        // vm.contact = contact;
        // vm.error = null;
        // vm.form = {};
        // vm.remove = remove;
        // vm.save = save;
        //
        // // Remove existing Contact
        // function remove() {
        //   if ($window.confirm('Are you sure you want to delete?')) {
        //     vm.contact.$remove($state.go('contacts.list'));
        //   }
        // }
        //
        // // Save Contact
        // function save(isValid) {
        //   if (!isValid) {
        //     $scope.$broadcast('show-errors-check-validity', 'vm.form.contactForm');
        //     return false;
        //   }
        //
        //   // TODO: move create/update logic to service
        //   if (vm.contact._id) {
        //     vm.contact.$update(successCallback, errorCallback);
        //   } else {
        //     vm.contact.$save(successCallback, errorCallback);
        //   }
        //
        //   function successCallback(res) {
        //     $state.go('contacts.view', {
        //       contactId: res._id
        //     });
        //   }
        //
        //   function errorCallback(res) {
        //     vm.error = res.data.message;
        //   }
        // }

        //guangyu: contact email controller
        $scope.contactform = function (isValid) {

            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

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
