'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('admin.users', {
                url: '/users',
                templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
                controller: 'UserListController'
            })
            .state('admin.user', {
                url: '/users/:userId',
                templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
                controller: 'UserController',
                resolve: {
                    userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
                        return Admin.get({
                            userId: $stateParams.userId
                        });
                    }]
                }
            })
            .state('admin.user-edit', {
                url: '/users/:userId/edit',
                templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
                controller: 'UserController',
                resolve: {
                    userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
                        return Admin.get({
                            userId: $stateParams.userId
                        });
                    }]
                }
            })
            .state('admin.list-pending-requests', {
                url: '/list-pending-requests',
                templateUrl: 'modules/users/client/views/admin/list-pending-requests.client.view.html',
                controller: 'UserListController'
            })
            .state('admin.view-pending-request', {
                url: '/list-pending-requests/:userId',
                templateUrl: 'modules/users/client/views/admin/view-pending-request.client.view.html',
                controller: 'UserController',
                resolve: {
                    userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
                        return Admin.get({
                            userId: $stateParams.userId
                        });
                    }]
                }
            })
            .state('admin.subscriptions', {
                url: '/subscriptions',
                templateUrl: 'modules/subscriptions/client/views/list-subscriptions.client.view.html',
                controller: 'SubscriptionsListController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Subscription List'
                }
            });
    }
]);
