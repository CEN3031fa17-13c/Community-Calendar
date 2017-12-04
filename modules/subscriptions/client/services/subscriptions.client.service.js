// Subscriptions service used to communicate Subscriptions REST endpoints
(function () {
    'use strict';

    angular
        .module('subscriptions')
        .factory('SubscriptionsService', SubscriptionsService);
    // .factory('ModalSubscriptionsService', ModalSubscriptionsService);


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


    // ModalSubscriptionsService.$inject = ['$rootScope'];
    //
    // function ModalSubscriptionsService($rootScope) {
    //     // this.connect = function () {
    //         var emailToSave = undefined;
    //
    //         function callSubscription(email) {
    //             emailToSave = email;
    //             // var socket = io();
    //             // socket.on('connect', function () {
    //                 // Call a function named 'someFunction' in controller 'ChatController'
    //                 $rootScope.$broadcast('eventFired', {
    //                     data: email
    //                 });
    //             // });
    //             console.log('In service, the email is:' + email);
    //
    //             return true;
    //         }
    //
    //         function setVal(newEmail) {
    //             console.log('in setVal');
    //             emailToSave = newEmail;
    //         }
    //
    //         function getVal() {
    //             console.log('in getVal');
    //             return emailToSave;
    //         }
    //
    //         return {
    //             setVal: setVal,
    //             getVal: getVal,
    //             callSubscription: callSubscription
    //         }
    //     // };
    //     // return this.connect();
    // }
}());
