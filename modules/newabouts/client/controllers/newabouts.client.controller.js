(function () {
    'use strict';

    // Newabouts controller
    angular
        .module('newabouts')
        .controller('NewaboutsController', NewaboutsController);

    NewaboutsController.$inject = ['$scope', '$timeout', '$state', '$window', 'FileUploader',  'Authentication', 'newaboutResolve', 'NewaboutsService','ProfilePictures','$resource'];

    function NewaboutsController($scope, $timeout, $state, $window, FileUploader, Authentication, newabout, NewaboutsService, ProfilePictures, $resource) {
        var vm = this;
        vm.authentication = Authentication;
        vm.newabout = newabout;
        // Query the About list using promise.
        vm.newabouts = NewaboutsService.query().$promise.then(function (data) {
            // If the is an About object, get the fist about profile from the DB.
            if (data.length > 0) {
                vm.newabout = data[0];
            }

            // Save in a temporal variable the image's url.
            if (vm.newabout.imageURL && vm.newabout.imageURL !== './modules/newabouts/client/img/aboutImages/uploads/') {
                $scope.imageURL = vm.newabout.imageURL;
            } else {
                // If not, save the default image.
                $scope.imageURL = 'modules/newabouts/client/img/aboutImages/default.png';
            }

            return data;
        });
        vm.error = null;
        vm.form = {};
        vm.save = save;


        /*
        * Upload about images.
        */
        // Create file uploader instance
        $scope.uploader = new FileUploader({
            url: '/api/newabouts/picture',
            alias: 'newAboutPicture'
        });

        // Set file uploader image filter
        // Unused in favor of AWS
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // Called after the user selected a new picture file
        // Only used to create queue of files for image uploading
        $scope.uploader.onAfterAddingFile = function (fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);
                fileReader.onload = function (fileReaderEvent) {
                    $timeout(function () {
                        $scope.imageURL = fileReaderEvent.target.result;

                        // Upload the new selected picture.
                        // $scope.uploadAboutPicture();
                    }, 0);
                };
            }
        };

        // Called after the user has successfully uploaded a new picture
        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // Show success message
            $scope.success = true;

            // Populate user object
            vm.newabout.imageURL = response.file.filename;
            vm.newabout.filename = response.file.filename;


            // Clear upload buttons
            $scope.cancelUpload();
        };

        // Called after the user has failed to uploaded a new picture
        // Unused function in favor of AWS. Useful if uploading to server is brought back
        $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
            // Clear upload buttons
            $scope.cancelUpload();

            // Show error message
            $scope.error = response.message;
        };


        // Change about picture
        // Unused in favor of AWS
        $scope.uploadAboutPicture = function () {
            // Clear messages
            $scope.success = $scope.error = null;

            // Start upload
            $scope.uploader.uploadAll();
        };

        // Cancel the upload process
        // Unused in favor of AWS
        $scope.cancelUpload = function () {
            $scope.uploader.clearQueue();
            $scope.imageURL = "";
        };
        // Get signed S3 response to allow uploading to AWS S3 bucket
        $scope.signS3 = function(){
            if(!$scope.uploader.queue.length){ 
                if (vm.newabout._id) {  //should always be true. should never need to create new object for DB
                        vm.newabout.$update(successCallback, errorCallback);
                    } 
                // If there does not exist an object in the database, create one manually using schema in server side
                return;
            }            
                var temp = $scope.uploader.queue[0]._file;
                var check = ProfilePictures.getSig({filename: temp.name, filetype: temp.type}).$promise.then(function(data){
                     // myImgs.push(data.url);
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', data.signedRequest);    //asynchronously send the object from client to S3
                xhr.onreadystatechange = () => {
                  if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        $scope.imageURL = data.url; //update image when done uploading
                        vm.newabout.imageURL = data.url;
                        $scope.$apply();            //apply changes to scope
                    }
                    else{
                      alert('Could not upload file.');
                    }
                  }
                };
                xhr.send(temp);
                    vm.newabout.imageURL = data.url;    //update newabout object
                    if (vm.newabout._id) {
                        vm.newabout.$update(successCallback, errorCallback);
                    } 
                    else {
                        vm.newabout.$save(successCallback, errorCallback);
                    }

            function successCallback(res) {
                $state.go('about-view', {
                    newaboutId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
                });

            if (vm.newabout._id) {  //update if picture not loaded 
                vm.newabout.$update(successCallback, errorCallback);
            } else {
                vm.newabout.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('about-view', {
                    newaboutId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        };

        // Save Newabout
        // All save logic is done in signS3 function
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.newaboutForm');
                return false;
            }
            $scope.signS3();    
        }
    }
}());
