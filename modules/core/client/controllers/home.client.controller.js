'use strict';

  angular.module('core').controller('HomeController', ['$scope','$compile','$timeout','uiCalendarConfig', 'Authentication', 'UpcomingeventsService', '$state', '$filter',
  function ($scope,$compile,$timeout,uiCalendarConfig, Authentication,UpcomingeventsService, $state, $filter, upcomingevent) {
    var vm = this;
    var count = 0;
    $scope.authentication = Authentication;
    $scope.events = [];
    $scope.uiConfig = {
      calendar:{
        height: 700,
        editable: false,
        header:{ /*calendar header buttons and month text*/
          // left: 'agendaDay, agendaWeek, month',
          //center: 'title',
          right: 'today prev,next'
        },
        // buttonText: { /*to change text on buttons*/
        //  today: 'Today',
        //  month: 'Monthly',
        //  week: 'Weekly',
        //  day: 'Daily'
        // },
        eventClick: $scope.eventClick,
        eventRender: $scope.eventRender
      }
    };
    
    // filtering feature is following with pushes event funtion inside of the filter function

 function filter(temp) {
     var vals = [];
     $('input:checkbox.calFilter:checked').each(function() {
         vals.push($(this).val());
     });
     return vals.indexOf(temp.category) !== -1;
 }

 $('#calendar').fullCalendar({
    eventLimit: 6,

     header:{ /*calendar header buttons and month text*/
         left: 'agendaDay, agendaWeek, month',
         center: 'title',
         right: 'today prev,next'
     },

     buttonText: { /*to change text on buttons*/
      today: 'Today',
      month: 'Monthly',
      week: 'Weekly',
      day: 'Daily'
    },

     eventClick: function(event, entry, view) {
         location.href = '/upcomingevents/' + event.eventID; //redirect events to their pages
         //$state.go('eventview({ upcomingeventId: event.eventID })');
     },
     eventRender: function(temp, element, view) {
       var start = ($filter('date')(new Date(temp.start), "MMMM dd")).toString(); //set formart of start date
       var end = ($filter('date')(new Date(temp.end), "MMMM dd")).toString(); //set formart of end date
       var content = 'Event: '+temp.title+ '\nOrganization: ' + temp.org +
                '\nStart Date: '+ start || ''; //text to appear as hoverable over events on calendar

           element.attr({'tooltip': content,
                         'tooltip-append-to-body': true});
           $compile(element)($scope);

           // when pushes event, add color to the bar background
         if (temp.category === 'Concerts')
             temp.color = '#8860D0';
         else if (temp.category === 'Parties')
             temp.color = '#5680E9';
         else if (temp.category === 'Seminars')
             temp.color = '#84CEEB';
         else if (temp.category === 'Workshops/Classes')
             temp.color = '#5AB9EA';
         else if (temp.category === 'Family/Kids Outings')
             temp.color = '#C1C8E4';
         else if (temp.category === 'Specials')
             temp.color = '#2460B1';
         else if (temp.category === 'Arts')
             temp.color = '#7CA5DD';
         else if (temp.category === 'Sports & Wellness')
             temp.color = '#C68BC4';
         else if (temp.category === 'Other')
             temp.color = '#D0D0D0';

         return filter(temp); // Only show if appropriate checkbox is checked
     },

     //function that pushes event to the full calendar
 events : $scope.myevents = function(start, end, timezone, callback) {
     UpcomingeventsService.query().$promise // call service to get the data for the calendar
         .then(function(data) {
             var events = [];
             for (var i = 0; i<data.length; i++){
                 var temp = {};
                 temp.title = data[i].name;
                 temp.start = data[i].eventDuration.startDate;
                 temp.end = data[i].eventDuration.endDate;
                 temp.category = data [i].category;
                 temp.eventID = data[i]._id;
                 temp.org = data[i].organization;

                 if (temp.category === "Concerts")
                     temp.color = '#8860D0';
                 else if (temp.category === "Parties")
                     temp.color = '#5680E9';
                 else if (temp.category === "Seminars")
                     temp.color = '#84CEEB';
                 else if (temp.category === "Workshops/Classes")
                     temp.color = '#5AB9EA';
                 else if (temp.category === "Family/Kids Outings")
                     temp.color = '#C1C8E4';
                 else if (temp.category === "Specials")
                     temp.color = '#2460B1';
                 else if (temp.category === "Arts")
                     temp.color = '#7CA5DD';
                 else if (temp.category === "Sports & Wellness")
                     temp.color = '#C68BC4';
                 else if (temp.category === "Other")
                     temp.color = '#D0D0D0';
                 events.push(temp)
             }
             callback(events)
         });
 }

 });

  /*When a checkbox changes, re-render events*/
 $('input:checkbox.calFilter').on('change', function() {
     $('#calendar').fullCalendar('rerenderEvents');
 });

      /////////////////////Populating top row of events////////////////
    vm.upcomingevents = UpcomingeventsService.query().$promise.then(function (data){
      $scope.popularEvents = [];
      var now = new Date();

      data = data.sort(function(a,b){return b.likes-a.likes});  //sort events from most to least likes
      var weekFromToday = new Date();
      weekFromToday.setDate(now.getDate()+7);
      for (var i = 0; i < data.length; i++){
        if ($filter('date')(data[i].eventDuration.endDate, "yyyy-MM-dd") >= $filter('date')(now, "yyyy-MM-dd") && $filter('date')(data[i].eventDuration.startDate, "yyyy-MM-dd") < ($filter('date')(weekFromToday, "yyyy-MM-dd"))){
          $scope.popularEvents.push(data[i]);
        }
        if($scope.popularEvents.length >= 3)break;
      }
      //////Fill with future events if unable to fill from current week//////////
      if ($scope.popularEvents.length < 3){
        for (var i = 0; i<data.length; i++){
          if ($filter('date')(data[i].eventDuration.endDate, "yyyy-MM-dd") >= $filter('date')(now, "yyyy-MM-dd")){
            $scope.popularEvents.push(data[i]);
          }
          if ($scope.popularEvents.length >= 3)break;
        }
      }
    });

    //////////////functions that could possibly provide use in future//////////////////
    // /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

    /* Change View */
    $scope.changeView = function(view,calendar) {
      console.log("In changeView");
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalendar = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
    ////////////////gotta see about this///////////////////////
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

  $scope.eventClick = function(event, entry, view) {
     location.href = '/upcomingevents/' + event.eventID;
 };
  }
]);
