(function () {
    'use strict';

    angular
        .module('subscriptions')
        .controller('SubscriptionsListController', SubscriptionsListController);

    SubscriptionsListController.$inject = ['SubscriptionsService', 'Authentication'];

    function SubscriptionsListController(SubscriptionsService, Authentication) {
        var vm = this;

        vm.subscriptions = SubscriptionsService.query();

        vm.authentication = Authentication;
    }
}());
