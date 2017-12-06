(function () {
    'use strict';

    // Subscriptions controller
    var myModule = angular.module('subscriptions');

    myModule.controller('SubscriptionsController', SubscriptionsController);

    SubscriptionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'SubscriptionsService', '$stateParams', '$http'];

    function SubscriptionsController($scope, $state, $window, Authentication, SubscriptionsService, $stateParams, $http) {
        console.log('SubscriptionsController');
        var vm = this;
        // Get admin authentication.
        vm.authentication = Authentication;
        // If the $stateParams.subscriptionId is true, get a simple object with this id. Otherwise, we are creating.
        if($stateParams.subscriptionId) {
            vm.subscription = SubscriptionsService.get($stateParams);
        }
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        $scope.successfullySaved = false;
        $scope.email = undefined;

        /** When the modal is submitted with an email, it calls this function. */
        $scope.submitted = function () {
            this.$close();
            vm.subscription = new SubscriptionsService({
                email: $scope.email
            });
            vm.save(true);
        };


        // Remove existing Subscription.
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.subscription.$remove($state.go('home'));
            }
        }

        // Save Subscription.
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.subscriptionForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.subscription._id) {
                vm.subscription.$update(successCallback, errorCallback);
            } else {
                vm.subscription.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $scope.successfullySaved = true;

                // Send email to this new subscriber.
                var data = ({
                    contactEmail: vm.subscription.email,
                    contactMsg: 'Thank you for subscribing to our Community Calendar website. You will receive updated information about upcoming events.\nIf you have any question, please contact us, we are always glad to help!'
                });

                $http.post('/api/auth/subscription', data).success(function (data, status, headers, config) {
                    console.log('Subscription email sent successfully!');
                }).error(function (data, status, headers, config) {
                    console.log('Error sending subscription email!');
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
}());
