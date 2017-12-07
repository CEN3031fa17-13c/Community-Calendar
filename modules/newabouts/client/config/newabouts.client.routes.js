(function () {
    'use strict';

    angular
        .module('newabouts')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('about-create', {
                url: '/create',
                templateUrl: 'modules/newabouts/client/views/form-newabout.client.view.html',
                controller: 'NewaboutsController',
                controllerAs: 'vm',
                resolve: {
                    newaboutResolve: newNewabout
                },
                data: {
                    roles: ['admin'],
                    pageTitle: 'Newabouts Create'
                }
            })
            .state('about-edit', {
                url: '/:newaboutId/edit',
                templateUrl: 'modules/newabouts/client/views/form-newabout.client.view.html',
                controller: 'NewaboutsController',
                controllerAs: 'vm',
                resolve: {
                    newaboutResolve: getNewabout
                },
                data: {
                    roles: ['admin'],
                    pageTitle: 'Edit Newabout {{ newaboutResolve.name }}'
                }
            })
            .state('about-view', {
                url: '/about',
                templateUrl: 'modules/newabouts/client/views/view-newabout.client.view.html',
                controller: 'NewaboutsController',
                controllerAs: 'vm',
                resolve: {
                    newaboutResolve: getNewabouts
                },
                data: {
                    pageTitle: 'View About'
                }
            });
    }

    /** Get the list of about objects to be displayed in the List page. */
    getNewabouts.$inject = ['NewaboutsService'];

    function getNewabouts(NewaboutsService) {
        return NewaboutsService.query().$promise;
    }

    getNewabout.$inject = ['$stateParams', 'NewaboutsService'];

    function getNewabout($stateParams, NewaboutsService) {
        return NewaboutsService.get({
            newaboutId: $stateParams.newaboutId
        }).$promise;
    }

    newNewabout.$inject = ['NewaboutsService'];

    function newNewabout(NewaboutsService) {
        return new NewaboutsService();
    }
}());
