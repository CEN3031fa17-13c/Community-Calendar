'use strict';

// Setting up route
angular.module('core', ['upcomingevents']).config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise(function ($injector, $location) {
            $injector.get('$state').transitionTo('not-found', null, {
                location: false
            });
        });

        // Home state routing
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'modules/core/client/views/home.client.view.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    upcomingeventResolve: listEvents
                },
                data: {
                    pageTitle: 'Community Calendar'
                }
            })
            // .state('viewpopular.view', {
            //     url: '/:upcomingeventId',
            //     templateUrl: 'modules/upcomingevents/client/views/view-upcomingevent.client.view.html',
            //     controller: 'UpcomingeventsController',
            //     controllerAs: 'vm',
            //     resolve: {
            //       upcomingeventResolve: getUpcomingevent
            //     },
            //     data: {
            //       pageTitle: 'Upcomingevent {{ upcomingeventResolve.name }}'
            //     }
            //   })
            .state('not-found', {
                url: '/not-found',
                templateUrl: 'modules/core/client/views/404.client.view.html',
                data: {
                    ignoreState: true
                }
            })
            .state('bad-request', {
                url: '/bad-request',
                templateUrl: 'modules/core/client/views/400.client.view.html',
                data: {
                    ignoreState: true
                }
            })
            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'modules/core/client/views/403.client.view.html',
                data: {
                    ignoreState: true
                }
            });
        getUpcomingevent.$inject = ['$stateParams', 'UpcomingeventsService'];

        function getUpcomingevent($stateParams, UpcomingeventsService) {
            return UpcomingeventsService.get({
                upcomingeventId: $stateParams.upcomingeventId
            }).$promise;
        }

        listEvents.$inject = ['UpcomingeventsService'];

        function listEvents(UpcomingeventsService) {
            return UpcomingeventsService.query().$promise;
        }
    }


]);
