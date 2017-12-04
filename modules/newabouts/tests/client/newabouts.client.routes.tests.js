(function () {
  'use strict';

  describe('Newabouts Route Tests', function () {
    // Initialize global variables
    var $scope,
      NewaboutsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _NewaboutsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      NewaboutsService = _NewaboutsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('newabouts');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/newabouts');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          NewaboutsController,
          mockNewabout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('newabouts.view');
          $templateCache.put('modules/newabouts/client/views/view-newabout.client.view.html', '');

          // create mock Newabout
          mockNewabout = new NewaboutsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Newabout Name'
          });

          // Initialize Controller
          NewaboutsController = $controller('NewaboutsController as vm', {
            $scope: $scope,
            newaboutResolve: mockNewabout
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:newaboutId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.newaboutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            newaboutId: 1
          })).toEqual('/newabouts/1');
        }));

        it('should attach an Newabout to the controller scope', function () {
          expect($scope.vm.newabout._id).toBe(mockNewabout._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/newabouts/client/views/view-newabout.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          NewaboutsController,
          mockNewabout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('newabouts.create');
          $templateCache.put('modules/newabouts/client/views/form-newabout.client.view.html', '');

          // create mock Newabout
          mockNewabout = new NewaboutsService();

          // Initialize Controller
          NewaboutsController = $controller('NewaboutsController as vm', {
            $scope: $scope,
            newaboutResolve: mockNewabout
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.newaboutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/newabouts/create');
        }));

        it('should attach an Newabout to the controller scope', function () {
          expect($scope.vm.newabout._id).toBe(mockNewabout._id);
          expect($scope.vm.newabout._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/newabouts/client/views/form-newabout.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          NewaboutsController,
          mockNewabout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('newabouts.edit');
          $templateCache.put('modules/newabouts/client/views/form-newabout.client.view.html', '');

          // create mock Newabout
          mockNewabout = new NewaboutsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Newabout Name'
          });

          // Initialize Controller
          NewaboutsController = $controller('NewaboutsController as vm', {
            $scope: $scope,
            newaboutResolve: mockNewabout
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:newaboutId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.newaboutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            newaboutId: 1
          })).toEqual('/newabouts/1/edit');
        }));

        it('should attach an Newabout to the controller scope', function () {
          expect($scope.vm.newabout._id).toBe(mockNewabout._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/newabouts/client/views/form-newabout.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
