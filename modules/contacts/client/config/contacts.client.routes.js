(function () {
  'use strict';

  angular
    .module('contacts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('contacts', {
        // abstract: true,
        url: '/contact',
        // template: '<ui-view/>'
        templateUrl: 'modules/contacts/client/views/view-contact.client.view.html'
      });
      // .state('contacts.list', {
      //   url: '',
      //   templateUrl: 'modules/contacts/client/views/list-contacts.client.view.html',
      //   controller: 'ContactsListController',
      //   controllerAs: 'vm',
      //   data: {
      //     pageTitle: 'Contacts List'
      //   }
      // })
      // .state('contacts.create', {
      //   url: '/create',
      //   templateUrl: 'modules/contacts/client/views/form-contact.client.view.html',
      //   controller: 'ContactsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     contactResolve: newContact
      //   },
      //   data: {
      //     roles: ['user', 'admin'],
      //     pageTitle: 'Contacts Create'
      //   }
      // })
      // .state('contacts.edit', {
      //   url: '/:contactId/edit',
      //   templateUrl: 'modules/contacts/client/views/form-contact.client.view.html',
      //   controller: 'ContactsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     contactResolve: getContact
      //   },
      //   data: {
      //     roles: 'admin',
      //     pageTitle: 'Edit Contact {{ contactResolve.name }}'
      //   }
      // })
      // .state('contacts.view', {
      //   url: '/:contactId',
      //   templateUrl: 'modules/contacts/client/views/view-contact.client.view.html',
      //   controller: 'ContactsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     contactResolve: getContact
      //   },
      //   data: {
      //     pageTitle: 'Contact {{ contactResolve.name }}'
      //   }
      // });
  }

  // getContact.$inject = ['$stateParams', 'ContactsService'];
  //
  // function getContact($stateParams, ContactsService) {
  //   return ContactsService.get({
  //     contactId: $stateParams.contactId
  //   }).$promise;
  // }
  //
  // newContact.$inject = ['ContactsService'];
  //
  // function newContact(ContactsService) {
  //   return new ContactsService();
  // }
}());
