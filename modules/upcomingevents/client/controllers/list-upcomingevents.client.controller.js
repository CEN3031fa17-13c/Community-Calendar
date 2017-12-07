(function () {
    'use strict';

    angular
        .module('upcomingevents')
        .controller('UpcomingeventsListController', UpcomingeventsListController);

    UpcomingeventsListController.$inject = ['$scope', 'UpcomingeventsService', "Authentication", 'orderByFilter', "$filter", '$state', 'NameToDisplayService'];

    function UpcomingeventsListController($scope, UpcomingeventsService, Authentication, orderBy, $filter, $state, NameToDisplayService) {
        var vm = this;
        $scope.authentication = Authentication;
        // Number of events to be displayed in a row.
        $scope.numberOfEventToDisplay = 4;

        // Get today object.
        $scope.today = new Date();
        // Create an object to represent 7 dates in advance.
        $scope.weekFromToday = new Date();
        $scope.weekFromToday.setDate($scope.weekFromToday.getDate() + 7);
        // Create an object to represent a month in advance.
        $scope.monthFromToday = new Date();
        $scope.monthFromToday.setMonth($scope.weekFromToday.getMonth() + 1);

        // Get upcoming events promise.
        vm.upcomingevents = UpcomingeventsService.query().$promise.then(function (data) {
            $scope.propertyName = 'eventDuration.startDate';
            $scope.reverse = false;
            $scope.upcomingevents = orderBy(data, $scope.propertyName, $scope.reverse);

            // Sort the upcoming event by starting dates.
            $scope.sortBy = function (propertyName) {
                // $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName) ? !$scope.reverse : false;
                // $scope.propertyName = propertyName;
                $scope.upcomingevents = orderBy(data, $scope.propertyName, $scope.reverse);
            };

            // Create a container that have up to the first four events.
            $scope.todayList = [];
            $scope.weekList = [];
            $scope.monthList = [];
            $scope.upcomingeventList = [];
            $scope.historyList = [];

            // For each object in the DB:
            for (var i = 0; i < data.length; i++) {
                if (($filter('date')(data[i].eventDuration.endDate, "yyyy-MM-dd") < $filter('date')($scope.today, "yyyy-MM-dd"))) {
                    // Get history events, the events that finished before today.
                    $scope.historyList.push(data[i]);
                } else {
                    // Get upcoming events, the events that have not finished jet.
                    $scope.upcomingeventList.push(data[i]);

                    if (($filter('date')(data[i].eventDuration.startDate, "yyyy-MM-dd") <= $filter('date')($scope.today, "yyyy-MM-dd")) && ($scope.todayList.length < $scope.numberOfEventToDisplay)) {
                        // Get today events, the events that are happening today.
                        $scope.todayList.push(data[i]);
                    } else if (($filter('date')(data[i].eventDuration.startDate, "yyyy-MM-dd") < $filter('date')($scope.weekFromToday, "yyyy-MM-dd")) && ($scope.weekList.length < $scope.numberOfEventToDisplay)) {
                        // Get week events, the events that are happening in the next 7 dates.
                        $scope.weekList.push(data[i]);
                    } else if (($filter('date')(data[i].eventDuration.startDate, "yyyy-MM-dd") < $filter('date')($scope.monthFromToday, "yyyy-MM-dd")) && ($scope.monthList.length < $scope.numberOfEventToDisplay)) {
                        // Get month events, the events that are happening in the next  30 dates.
                        $scope.monthList.push(data[i]);
                    }
                }
            }

            // Create containers with all the events.
            $scope.todayFullList = [];
            $scope.weekFullList = [];
            $scope.monthFullList = [];

            // For each event that is not a pass event:
            for (i = 0; i < $scope.upcomingeventList.length; i++) {
                if ($filter('date')($scope.upcomingeventList[i].eventDuration.startDate, "yyyy-MM-dd") <= $filter('date')($scope.today, "yyyy-MM-dd")) {
                    // Get today events, the events that are happening today. Also, it is a week and month event.
                    $scope.todayFullList.push($scope.upcomingeventList[i]);
                    $scope.weekFullList.push($scope.upcomingeventList[i]);
                    $scope.monthFullList.push($scope.upcomingeventList[i]);
                } else if ($filter('date')($scope.upcomingeventList[i].eventDuration.startDate, "yyyy-MM-dd") < $filter('date')($scope.weekFromToday, "yyyy-MM-dd")) {
                    // Get week events, the events that are happening in the next 7 dates. Also, it is a month event.
                    $scope.weekFullList.push($scope.upcomingeventList[i]);
                    $scope.monthFullList.push($scope.upcomingeventList[i]);
                } else if ($filter('date')($scope.upcomingeventList[i].eventDuration.startDate, "yyyy-MM-dd") < $filter('date')($scope.monthFromToday, "yyyy-MM-dd")) {
                    // Get month events, the events that are happening in the next  30 dates.
                    $scope.monthFullList.push($scope.upcomingeventList[i]);
                }
            }

            return data;
        });

        // Get the name of the list to display from the service.
        $scope.nameToDisplay = '';
        $scope.getService = function () {
            $scope.nameToDisplay = NameToDisplayService.get();
        };

        // Change the view and load the today event list.
        $scope.tEvents = function () {
            NameToDisplayService.set("today");
            $state.go('upcomingevents.today', {});
        };
        // Change the view and load the week event list.
        $scope.wEvents = function () {
            NameToDisplayService.set("week");
            $state.go('upcomingevents.week', {});
        };
        // Change the view and load the month event list.
        $scope.mEvents = function () {
            NameToDisplayService.set("month");
            $state.go('upcomingevents.month', {});
        };
        // Change the view and load the all upcoming event list.
        $scope.allEvents = function () {
            NameToDisplayService.set("all");
            $state.go('upcomingevents.all', {});
        };
    }

}());
