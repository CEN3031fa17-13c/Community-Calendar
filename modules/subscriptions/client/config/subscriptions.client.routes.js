(function () {
    'use strict';

    angular
        .module('subscriptions')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('subscriptions', {
                url: '/subscriptions',
                template: '<ui-view/>'
            })
            .state('subscriptions.list', {
                url: '/subscriptions',
                templateUrl: 'modules/subscriptions/client/views/list-subscriptions.client.view.html',
                controller: 'SubscriptionsListController',
                controllerAs: 'vm',
                data: {
                    roles: ['admin'],
                    pageTitle: 'Subscriptions List'
                }
            })
            .state('subscriptions.create', {
                url: '/create',
                templateUrl: 'modules/subscriptions/client/views/form-subscription.client.view.html',
                controller: 'SubscriptionsController',
                controllerAs: 'vm',
                resolve: {
                    subscriptionResolve: newSubscription
                },
                data: {
                    roles: ['*'],
                    pageTitle: 'Subscriptions Create'
                }
            })
            .state('subscriptions.edit', {
                url: '/:subscriptionId/edit',
                templateUrl: 'modules/subscriptions/client/views/form-subscription.client.view.html',
                controller: 'SubscriptionsController',
                controllerAs: 'vm',
                resolve: {
                    subscriptionResolve: getSubscription
                },
                data: {
                    roles: ['admin'],
                    pageTitle: 'Edit Subscription {{ subscriptionResolve.name }}'
                }
            })
            .state('subscriptions.view', {
                url: '/:subscriptionId',
                templateUrl: 'modules/subscriptions/client/views/view-subscription.client.view.html',
                controller: 'SubscriptionsController',
                controllerAs: 'vm',
                resolve: {
                    subscriptionResolve: getSubscription
                },
                data: {
                    roles: ['admin'],
                    pageTitle: 'Subscription {{ subscriptionResolve.name }}'
                }
            });
    }

    getSubscription.$inject = ['$stateParams', 'SubscriptionsService'];

    function getSubscription($stateParams, SubscriptionsService) {
        return SubscriptionsService.get({
            subscriptionId: $stateParams.subscriptionId
        }).$promise;
    }

    newSubscription.$inject = ['SubscriptionsService'];

    function newSubscription(SubscriptionsService) {
        return new SubscriptionsService();
    }
}());
