(function () {
  'use strict';

  describe('Subscriptions Route Tests', function () {
    // Initialize global variables
    var $scope,
      SubscriptionsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SubscriptionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SubscriptionsService = _SubscriptionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('subscriptions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/subscriptions');
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
          SubscriptionsController,
          mockSubscription;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('subscriptions.view');
          $templateCache.put('modules/subscriptions/client/views/view-subscription.client.view.html', '');

          // create mock Subscription
          mockSubscription = new SubscriptionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Subscription Name'
          });

          // Initialize Controller
          SubscriptionsController = $controller('SubscriptionsController as vm', {
            $scope: $scope,
            subscriptionResolve: mockSubscription
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:subscriptionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.subscriptionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            subscriptionId: 1
          })).toEqual('/subscriptions/1');
        }));

        it('should attach an Subscription to the controller scope', function () {
          expect($scope.vm.subscription._id).toBe(mockSubscription._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/subscriptions/client/views/view-subscription.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SubscriptionsController,
          mockSubscription;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('subscriptions.create');
          $templateCache.put('modules/subscriptions/client/views/form-subscription.client.view.html', '');

          // create mock Subscription
          mockSubscription = new SubscriptionsService();

          // Initialize Controller
          SubscriptionsController = $controller('SubscriptionsController as vm', {
            $scope: $scope,
            subscriptionResolve: mockSubscription
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.subscriptionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/subscriptions/create');
        }));

        it('should attach an Subscription to the controller scope', function () {
          expect($scope.vm.subscription._id).toBe(mockSubscription._id);
          expect($scope.vm.subscription._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/subscriptions/client/views/form-subscription.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SubscriptionsController,
          mockSubscription;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('subscriptions.edit');
          $templateCache.put('modules/subscriptions/client/views/form-subscription.client.view.html', '');

          // create mock Subscription
          mockSubscription = new SubscriptionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Subscription Name'
          });

          // Initialize Controller
          SubscriptionsController = $controller('SubscriptionsController as vm', {
            $scope: $scope,
            subscriptionResolve: mockSubscription
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:subscriptionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.subscriptionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            subscriptionId: 1
          })).toEqual('/subscriptions/1/edit');
        }));

        it('should attach an Subscription to the controller scope', function () {
          expect($scope.vm.subscription._id).toBe(mockSubscription._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/subscriptions/client/views/form-subscription.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
