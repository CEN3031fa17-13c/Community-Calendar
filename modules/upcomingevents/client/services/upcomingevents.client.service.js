// Upcomingevents service used to communicate Upcomingevents REST endpoints
(function () {
    'use strict';

    angular
        .module('upcomingevents')
        .factory('UpcomingeventsService', UpcomingeventsService)
        .factory('NameToDisplayService', NameToDisplayService);

    UpcomingeventsService.$inject = ['$resource'];

    function UpcomingeventsService($resource) {
        return $resource('api/upcomingevents/:upcomingeventId', {
            upcomingeventId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }

    NameToDisplayService.$inject = [];
    function NameToDisplayService() {
        var nameToDisplay = '';
        function set(data) {
            nameToDisplay = data;
        }
        function get() {
            return nameToDisplay;
        }

        return {
            set: set,
            get: get
        };
    }

}());
