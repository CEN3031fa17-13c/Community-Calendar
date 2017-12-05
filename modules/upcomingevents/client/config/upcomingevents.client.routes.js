(function () {
    'use strict';

    angular
        .module('upcomingevents')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('upcomingevents', {
                url: '/upcomingevents',
                template: '<ui-view/>'
            })
            .state('upcomingevents.list', {
                url: '/list',
                templateUrl: 'modules/upcomingevents/client/views/list-upcomingevents.client.view.html',
                controller: 'UpcomingeventsListController',
                controllerAs: 'vm',
                resolve: {
                    upcomingeventResolve: getUpcomingevents
                },
                data: {
                    pageTitle: 'Upcomingevents List'
                }
            })
            .state('upcomingevents.create', {
                url: '/create',
                templateUrl: 'modules/upcomingevents/client/views/form-upcomingevent.client.view.html',
                controller: 'UpcomingeventsController',
                controllerAs: 'vm',
                resolve: {
                    upcomingeventResolve: newUpcomingevent
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Create Event'
                }
            })
            .state('upcomingevents.edit', {
                url: '/:upcomingeventId/edit',
                templateUrl: 'modules/upcomingevents/client/views/form-upcomingevent.client.view.html',
                controller: 'UpcomingeventsController',
                controllerAs: 'vm',
                resolve: {
                    upcomingeventResolve: getUpcomingevent
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Edit Upcoming Event {{ upcomingeventResolve.name }}'
                }
            })
            .state('upcomingevents.view', {
                url: '/:upcomingeventId',
                templateUrl: 'modules/upcomingevents/client/views/view-upcomingevent.client.view.html',
                controller: 'UpcomingeventsController',
                controllerAs: 'vm',
                resolve: {
                    upcomingeventResolve: getUpcomingevent
                },
                data: {
                    pageTitle: 'Upcomingevent {{ upcomingeventResolve.name }}'
                }
            })
            .state('upcomingevents.selectedList', {
                url: '/list',
                templateUrl: 'modules/upcomingevents/client/views/selected-list-upcomingevent.client.view.html',
                controller: 'UpcomingeventsListController',
                controllerAs: 'vm',
                resolve: {
                    upcomingeventResolve: getUpcomingevents
                },
                data: {
                    pageTitle: 'Selected List'
                }
            });
    }

      // Get a particular upcoming event object to be displayed in the View page.
    getUpcomingevent.$inject = ['$stateParams', 'UpcomingeventsService'];

    function getUpcomingevent($stateParams, UpcomingeventsService) {
        return UpcomingeventsService.get({
            upcomingeventId: $stateParams.upcomingeventId
        }).$promise;
    }

    // Get the list of upcoming event objects to be displayed in the List page.
    getUpcomingevents.$inject = ['UpcomingeventsService'];

    function getUpcomingevents(UpcomingeventsService) {
        return UpcomingeventsService.query().$promise;
    }

    // Create a new upcoming event object.
    newUpcomingevent.$inject = ['UpcomingeventsService'];

    function newUpcomingevent(UpcomingeventsService) {
        return new UpcomingeventsService();
    }
}());
