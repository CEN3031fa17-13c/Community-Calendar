(function () {
    'use strict';

    angular
        .module('upcomingevents')
        .run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(menuService) {
        // Set top bar menu items
        menuService.addMenuItem('topbar', {
            title: 'Upcoming Events',
            state: 'upcomingevents.list',
            roles: ['*']
        });
        menuService.addMenuItem('topbar', {
            title: 'Create Event',
            state: 'upcomingevents.create',
            roles: ['user', 'admin']
        });
    }
}());
