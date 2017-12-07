(function () {
    'use strict';

    angular
        .module('subscriptions')
        .controller('SubscriptionsListController', SubscriptionsListController);

    SubscriptionsListController.$inject = ['SubscriptionsService', 'Authentication'];

    function SubscriptionsListController(SubscriptionsService, Authentication) {
        var vm = this;
        // Get list of subscribers.
        vm.subscriptions = SubscriptionsService.query();
        // Get admin authentication.
        vm.authentication = Authentication;
    }
}());
