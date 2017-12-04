'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$window', '$timeout', 'Authentication', 'Menus', '$modal',
    function ($scope, $state, $window, $timeout, Authentication, Menus, $modal) {
        /** Popup with the invitation to subscribe. */
        if (Authentication.user.roles != 'user' && Authentication.user.roles != 'admin') {
            $timeout(function () {
                /** Display subscription popup. This controller is from a different module. */
                $modal.open({
                    templateUrl: 'modules/subscriptions/client/views/form-subscription.client.view.html',
                    controller: 'SubscriptionsController'
                }).result.then($scope.Submit = function () {
                    /** A subscription was submitted. */
                    console.log("In Core Module return was valid!");

                }, function () {
                    /** The subscription popup was canceled. */
                    console.log("Subscription canceled!");
                });
            }, 5000);
        }


        // Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });
    }
]);
