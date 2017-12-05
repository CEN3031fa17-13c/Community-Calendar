(function () {
    'use strict';

    // Upcomingevents controller
    angular
        .module('upcomingevents')
        .controller('UpcomingeventsController', UpcomingeventsController);

    UpcomingeventsController.$inject = ['$scope', '$timeout', '$state', '$window', '$filter', 'FileUploader', 'Authentication', 'upcomingeventResolve','Pictures'];

    function UpcomingeventsController($scope, $timeout, $state, $window, $filter, FileUploader, Authentication, upcomingevent,Pictures) {
        var vm = this;
        vm.authentication = Authentication;
        vm.upcomingevent = upcomingevent;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        $scope.user = Authentication.user;
        vm.like = like;
        $scope.imageURLList = [];
        $scope.previewImg = "other";



        /* Time to swap event images. */
        $scope.myInterval = 5000;


        /* Check boxes */
        $scope.checkbox = {
            value1: true
        };

        /* Map properties */
        $scope.map = {center: [30.4398411, -84.28155099999998], zoom: 100};
        /* Markers to represents in google map */
        $scope.markers = [];
        /* Category list */
        $scope.categories = ["Concerts", "Parties", "Seminars", "Workshops/Classes", "Family/Kids Outings", "Specials", "Arts", "Sports & Wellness", "Other"];
        /* Dress code list */
        $scope.dress_codes = ["White Tie", "Black Tie", "Lounge Suit", "Cocktail", "Smart Casual", "Other"];
        /* Temporal event duration dictionary */
        $scope.eventDuration = {
            startDate: {
                value: new Date($filter('date')(new Date(), "yyyy-MM-dd HH:mm"))
            },
            endDate: {
                value: new Date($filter('date')(new Date(), "yyyy-MM-dd HH:mm"))
            }
        };
        /* Minimum dates require */
        $scope.minStartDate = ($filter('date')(new Date(), "yyyy-MM-dd")).toString();
        $scope.minEndDate = ($filter('date')($scope.eventDuration.startDate.value, "yyyy-MM-dd")).toString();

        $scope.fillMinDates = function () {
            /* Minimum end date require */
            $scope.minEndDate = ($filter('date')($scope.eventDuration.startDate.value, "yyyy-MM-dd")).toString();
        };

        /**
        * fillFields sets temporal eventDuration object and event marker container
        * to be used by view-upcomingevent.client.view.html
        * */
        $scope.fillFields = function () {
            $scope.changeCat();
            if (vm.upcomingevent.eventDuration) {
                $scope.eventDuration.startDate.value = new Date($filter('date')(vm.upcomingevent.eventDuration.startDate, "yyyy-MM-dd HH:mm"));
                $scope.eventDuration.endDate.value = new Date($filter('date')(vm.upcomingevent.eventDuration.endDate, "yyyy-MM-dd HH:mm"));
            }
            /* Clear the marker container */
            $scope.markers = [];
            /* Create a new marker with the event coordinates */
            if (vm.upcomingevent.coordinates) {
                $scope.markers.push({
                    name: vm.upcomingevent.name,
                    address: vm.upcomingevent.location,
                    position: [vm.upcomingevent.coordinates.latitude, vm.upcomingevent.coordinates.longitude],
                    id: 0
                });
            }
            if (vm.upcomingevent.imageURLList) {
                // console.log(vm.upcomingevent.imageURLList);
                for (var i = 0; i < vm.upcomingevent.imageURLList.length; i++) {
                    if (vm.upcomingevent.imageURLList[i]) {
                        $scope.imageURLList.push(vm.upcomingevent.imageURLList[i]);
                    } else {
                        $scope.imageURLList.push('modules/upcomingevents/client/img/eventImages/placeholders/' + $scope.previewImg + '.jpg');
                    }
                }
            } else {
                $scope.imageURLList.push('modules/upcomingevents/client/img/eventImages/placeholders/' + $scope.previewImg + '.jpg');
            }
        };
        $scope.changeCat = function(){//switch function called each time new category is picked to update placeholder
            switch (vm.upcomingevent.category){
                case "Concerts":
                    $scope.previewImg = 'concerts';
                    break;
                case 'Parties':
                    $scope.previewImg = 'parties'
                    break;
                case 'Seminars':
                    $scope.previewImg = 'seminars';
                    break;
                case 'Workshops/Classes':
                    $scope.previewImg = 'workshops_classes';
                    break;
                case 'Family/Kids Outings':
                    $scope.previewImg = 'family_kids_outings';
                    break;
                case 'Other':
                    $scope.previewImg = 'other';
                    break;
                case 'Specials':
                    $scope.previewImg = 'special';
                    break;
                case 'Arts':
                    $scope.previewImg = 'arts';
                    break;
                case 'Sports & Wellness':
                    $scope.previewImg = 'sports_wellness';
                    break;
            }
        };
        //**
        //function to change the category color of the individual event page top
        //**
        $scope.changeBackground = function(){
            var color;
            switch(vm.upcomingevent.category ){
                case "Concerts":
                    color = '#8860D0';
                    break;
                case "Parties":
                    color = '#5680E9';
                    break;
                case "Seminars":
                    color = '#84CEEB';
                    break;
                case "Workshops/Classes":
                    color = '#5AB9EA';
                    break;
                case "Family/Kids Outings":
                    color = '#C1C8E4';
                    break;
                case "Specials":
                    color = '#2460B1';
                    break;
                case "Arts":
                    color = '#7CA5DD';
                    break;
                case "Sports & Wellness":
                    color = '#C68BC4';
                    break;
                case "Other":
                    color = '#D0D0D0';
                    break;
            }
            return color;
        };

        /*
        * Upload upcoming event images.
        */
        // Create file uploader instance
        $scope.uploader = new FileUploader({
            url: '/api/upcomingevents/picture',
            alias: 'newEventPicture'
        });

        // Set file uploader image filter
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // Called after the user selected a new picture file
        //creates uploader.queue which is used for S3
        $scope.uploader.onAfterAddingFile = function (fileItem) {
            // console.log("onAfterAddingFile");
            // console.log(fileItem);
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);
                fileReader.onload = function (fileReaderEvent) {
                    $timeout(function () {
                        if (!$scope.imageURLList) {
                            $scope.imageURLList = [];
                        } else if ($filter("filter")($scope.imageURLList, fileReaderEvent.target.result)) {
                            $scope.imageURLList.splice($scope.imageURLList.indexOf(fileReaderEvent.target.result), 1);
                        }
                        $scope.imageURLList.push(fileReaderEvent.target.result);
                        // console.log($scope.imageURLList);

                        // Upload the new selected picture.
                        // $scope.uploadEventPicture();
                    }, 0);
                };
            }
        };

        // Called after the user has successfully uploaded a new picture
        //unused function after AWS was added. used if server uploads are desired
        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // console.log("onSuccessItem");

            // Show success message
            $scope.success = true;

            // Populate upcoming event object
            if (!vm.upcomingevent.filenameList) {
                vm.upcomingevent.filenameList = [];
            } else if ($filter("filter")($scope.filenameList, response.file.filename)) {
                // This image already was selected.
                $scope.filenameList.splice($scope.filenameList.indexOf(response.file.filename), 1);
                vm.upcomingevent.filenameList.splice(vm.upcomingevent.filenameList.indexOf(response.file.filename), 1);
            }
            vm.upcomingevent.filenameList.push(response.file.filename);
            // Delete old file names. Deleting these old file names will be enough since file names define urls.
            if (vm.upcomingevent.filenameList.length > $scope.uploader.queue.length) {
                vm.upcomingevent.filenameList.splice(0, vm.upcomingevent.filenameList.length - $scope.uploader.queue.length);
            }

            if (!vm.upcomingevent.imageURLList) {
                vm.upcomingevent.imageURLList = [];
            } else if ($filter("filter")($scope.imageURLList, response.file.filename)) {
                $scope.imageURLList.splice($scope.imageURLList.indexOf(response.file.filename), 1);
                vm.upcomingevent.imageURLList.splice(vm.upcomingevent.imageURLList.indexOf(response.file.filename), 1);
            }
            vm.upcomingevent.imageURLList.push(response.file.path);
            $scope.imageURLList.push(response.file.path);

            // console.log($scope.uploader.queue);

            $scope.imageURLList.push('modules/upcomingevents/client/img/eventImages/default.png' + response.file.filename);
            // Clear upload buttons
            $scope.cancelUpload();
        };

        // Called after the user has failed to uploaded a new picture
        $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
            // Clear upload buttons
            $scope.cancelUpload();

            // Show error message
            $scope.error = response.message;
        };


        // Cancel the upload process
        $scope.cancelUpload = function () {
        };


        // Remove existing Upcomingevent
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.upcomingevent.$remove($state.go('upcomingevents.list'));
            }
        }

        // Save Upcomingevent
        function save(isValid) {
            vm.upcomingevent.eventDuration = {
                startDate: {
                    type: Date,
                },
                endDate: {
                    type: Date,
                }
            };

            if ($scope.eventDuration.startDate.value) {
                vm.upcomingevent.eventDuration.startDate = $scope.eventDuration.startDate.value;
            }
            if ((!$scope.checkbox.value1) && $scope.eventDuration.startDate.value) {
                // There is not end date. So, we assume that end date is start date plus one hour.
                vm.upcomingevent.eventDuration.endDate = new Date($filter('date')($scope.eventDuration.startDate.value, "yyyy-MM-dd HH:mm"));
                vm.upcomingevent.eventDuration.endDate.setHours(vm.upcomingevent.eventDuration.endDate.getHours() + 1);
            } else if ($scope.eventDuration.endDate.value) {
                vm.upcomingevent.eventDuration.endDate = $scope.eventDuration.endDate.value;
            }

            function getLatitudeLongitude(address) {
                // If adress is not supplied, use default value '106 E Jefferson St, Tallahassee, FL 32301'
                address = address || '106 E Jefferson St, Tallahassee, FL 32301';
                // Initialize the Geocoder
                var geocoder = new google.maps.Geocoder();
                if (geocoder) {
                    geocoder.geocode({
                        'address': address
                    }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            // callback(results[0]);
                            vm.upcomingevent.coordinates = {
                                latitude: results[0].geometry.location.lat(),
                                longitude: results[0].geometry.location.lng()
                            };

                            if (!isValid) {
                                $scope.$broadcast('show-errors-check-validity', 'vm.form.upcomingeventForm');
                                return false;
                            }
                            $scope.s3upload(); //handles create update logic
                        }
                    });
                }
            }

            getLatitudeLongitude(vm.upcomingevent.location);

            //Play Video
            function playVideo(event) {
                vm.upcomingevent.videoURL = event.videoURL;
                return vm.upcomingevent.videoURL;
            }
        }


        // Like feature
        function like() {
            //check if user is signed in and has not liked event
            $scope.user = Authentication.user;
            var hasLiked = 0;
            for (var i = 0; i < vm.upcomingevent.likedby.length; i++) {
                if (vm.upcomingevent.likedby[i] === $scope.user.username) hasLiked = 1;
            }
            //like if allowed
            if ($scope.user && !hasLiked) {
                vm.upcomingevent.likes++;
                vm.upcomingevent.likedby.push($scope.user.username);
                vm.upcomingevent.$update(successCallback, errorCallback);
            }
            else if ($scope.user && hasLiked) { //unlike functionality
                vm.upcomingevent.likes--;
                vm.upcomingevent.likedby = vm.upcomingevent.likedby.filter(function () {
                    return !$scope.user.username
                });
                vm.upcomingevent.$update(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('upcomingevents.view', {
                    upcomingeventId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }

        }
        $scope.s3upload = function(){//TODO: remove old pictures from AWS
            if(!$scope.uploader.queue.length){ //logic if no piture has been uploaded
                if (vm.upcomingevent._id) {
                        vm.upcomingevent.$update(successCallback, errorCallback);
                    } 
                    else {//save placeholder as event image
                        var newURL = [`modules/upcomingevents/client/img/eventImages/placeholders/${$scope.previewImg}.jpg`];
                        vm.upcomingevent.imageURLList = newURL;
                        vm.upcomingevent.$save(successCallback, errorCallback);
                }
                return;}
            var myImgs = []; //create array to hold uploads           
            for(var i = 0; i < $scope.uploader.queue.length; i++){
                var temp = $scope.uploader.queue[i]._file;
                (function(temp) {
                var check = Pictures.getSig({filename: temp.name, filetype: temp.type}).$promise.then(function(data){
                     myImgs.push(data.url);
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', data.signedRequest);//async send to AWS
                xhr.onreadystatechange = () => {
                  if(xhr.readyState === 4){
                    if(xhr.status === 200){
                    }
                    else{
                      alert('Could not upload file.');
                    }
                  }
                };
                xhr.send(temp);

                if(myImgs.length === $scope.uploader.queue.length){//update if event exists, create if new
                    vm.upcomingevent.imageURLList = myImgs;
                    if (vm.upcomingevent._id) {
                        vm.upcomingevent.$update(successCallback, errorCallback);
                    } 
                    else {
                        vm.upcomingevent.$save(successCallback, errorCallback);
                    }
                }

            function successCallback(res) {//callbacks for uploading
                $state.go('upcomingevents.view', {
                    upcomingeventId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
                });

            })(temp);//save temp in closure so that correct image is uploaded when dealing with promise in loop
            }
            function successCallback(res) {
                $state.go('upcomingevents.view', {
                    upcomingeventId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
}());
