'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
    function (Menus) {
        Menus.addSubMenuItem('topbar', 'admin', {
            title: 'Manage Users',
            state: 'admin.users'
        });
        Menus.addSubMenuItem('topbar', 'admin', {
            title: 'Pending User Requests',
            state: 'admin.list-pending-requests'
        });
        Menus.addSubMenuItem('topbar', 'admin', {
            title: 'Subscriptions',
            state: 'admin.subscriptions'
        });
    }
]);
