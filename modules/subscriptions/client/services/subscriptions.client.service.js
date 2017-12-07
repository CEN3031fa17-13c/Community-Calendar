// Subscriptions service used to communicate Subscriptions REST endpoints
(function () {
    'use strict';

    angular
        .module('subscriptions')
        .factory('SubscriptionsService', SubscriptionsService);


    SubscriptionsService.$inject = ['$resource'];

    function SubscriptionsService($resource) {
        return $resource('api/subscriptions/:subscriptionId', {
            subscriptionId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
}());
