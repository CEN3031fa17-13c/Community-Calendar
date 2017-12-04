(function () {
  'use strict';

  describe('Newabouts Controller Tests', function () {
    // Initialize global variables
    var NewaboutsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      NewaboutsService,
      mockNewabout;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _NewaboutsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      NewaboutsService = _NewaboutsService_;

      // create mock Newabout
      mockNewabout = new NewaboutsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Newabout Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Newabouts controller.
      NewaboutsController = $controller('NewaboutsController as vm', {
        $scope: $scope,
        newaboutResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleNewaboutPostData;

      beforeEach(function () {
        // Create a sample Newabout object
        sampleNewaboutPostData = new NewaboutsService({
          name: 'Newabout Name'
        });

        $scope.vm.newabout = sampleNewaboutPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (NewaboutsService) {
        // Set POST response
        $httpBackend.expectPOST('api/newabouts', sampleNewaboutPostData).respond(mockNewabout);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Newabout was created
        expect($state.go).toHaveBeenCalledWith('newabouts.view', {
          newaboutId: mockNewabout._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/newabouts', sampleNewaboutPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Newabout in $scope
        $scope.vm.newabout = mockNewabout;
      });

      it('should update a valid Newabout', inject(function (NewaboutsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/newabouts\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('newabouts.view', {
          newaboutId: mockNewabout._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (NewaboutsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/newabouts\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Newabouts
        $scope.vm.newabout = mockNewabout;
      });

      it('should delete the Newabout and redirect to Newabouts', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/newabouts\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('newabouts.list');
      });

      it('should should not delete the Newabout and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
