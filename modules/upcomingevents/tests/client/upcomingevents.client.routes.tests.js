(function () {
  'use strict';

  describe('Upcomingevents Route Tests', function () {
    // Initialize global variables
    var $scope,
      UpcomingeventsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _UpcomingeventsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      UpcomingeventsService = _UpcomingeventsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('upcomingevents');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/upcomingevents');
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
          UpcomingeventsController,
          mockUpcomingevent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('upcomingevents.view');
          $templateCache.put('modules/upcomingevents/client/views/view-upcomingevent.client.view.html', '');

          // create mock Upcomingevent
          mockUpcomingevent = new UpcomingeventsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Upcomingevent Name'
          });

          // Initialize Controller
          UpcomingeventsController = $controller('UpcomingeventsController as vm', {
            $scope: $scope,
            upcomingeventResolve: mockUpcomingevent
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:upcomingeventId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.upcomingeventResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            upcomingeventId: 1
          })).toEqual('/upcomingevents/1');
        }));

        it('should attach an Upcomingevent to the controller scope', function () {
          expect($scope.vm.upcomingevent._id).toBe(mockUpcomingevent._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/upcomingevents/client/views/view-upcomingevent.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          UpcomingeventsController,
          mockUpcomingevent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('upcomingevents.create');
          $templateCache.put('modules/upcomingevents/client/views/form-upcomingevent.client.view.html', '');

          // create mock Upcomingevent
          mockUpcomingevent = new UpcomingeventsService();

          // Initialize Controller
          UpcomingeventsController = $controller('UpcomingeventsController as vm', {
            $scope: $scope,
            upcomingeventResolve: mockUpcomingevent
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.upcomingeventResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/upcomingevents/create');
        }));

        it('should attach an Upcomingevent to the controller scope', function () {
          expect($scope.vm.upcomingevent._id).toBe(mockUpcomingevent._id);
          expect($scope.vm.upcomingevent._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/upcomingevents/client/views/form-upcomingevent.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          UpcomingeventsController,
          mockUpcomingevent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('upcomingevents.edit');
          $templateCache.put('modules/upcomingevents/client/views/form-upcomingevent.client.view.html', '');

          // create mock Upcomingevent
          mockUpcomingevent = new UpcomingeventsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Upcomingevent Name'
          });

          // Initialize Controller
          UpcomingeventsController = $controller('UpcomingeventsController as vm', {
            $scope: $scope,
            upcomingeventResolve: mockUpcomingevent
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:upcomingeventId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.upcomingeventResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            upcomingeventId: 1
          })).toEqual('/upcomingevents/1/edit');
        }));

        it('should attach an Upcomingevent to the controller scope', function () {
          expect($scope.vm.upcomingevent._id).toBe(mockUpcomingevent._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/upcomingevents/client/views/form-upcomingevent.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
