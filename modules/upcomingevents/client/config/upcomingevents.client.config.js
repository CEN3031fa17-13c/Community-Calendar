(function () {
    'use strict';

    angular
        .module('upcomingevents')
        .run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(menuService) {
        // Set Upcoming Events as top bar menu items.
        menuService.addMenuItem('topbar', {
            title: 'Upcoming Events',
            state: 'upcomingevents.list',
            roles: ['*']
        });
        // Set Create Events as top bar menu items.
        menuService.addMenuItem('topbar', {
            title: 'Create Event',
            state: 'upcomingevents.create',
            roles: ['user', 'admin']
        });
    }
}());
