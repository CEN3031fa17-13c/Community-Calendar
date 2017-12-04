'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Upcomingevents Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/upcomingevents',
            permissions: '*'
        }, {
            resources: '/api/upcomingevents/:upcomingeventId',
            permissions: '*'
        }, {
            resources: '/api/upcomingevents/picture',
            permissions: '*'
        }]
    }, {
        roles: ['user'],
        allows: [{
            resources: '/api/upcomingevents',
            permissions: ['get', 'post','put']
        }, {
            resources: '/api/upcomingevents/:upcomingeventId',
            permissions: ['get','put']
        }, {
            resources: '/api/upcomingevents/picture',
            permissions: ['get', 'post']
        }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/upcomingevents',
            permissions: ['get']
        }, {
            resources: '/api/upcomingevents/:upcomingeventId',
            permissions: ['get']
        }, {
            resources: '/api/upcomingevents/picture',
            permissions: ['get']
        }]
    }]);
};

/**
 * Check If Upcomingevents Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an Upcomingevent is being processed and the current user created it then allow any manipulation
    if (req.upcomingevent && req.user && req.upcomingevent.user && req.upcomingevent.user.id === req.user.id) {
        return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};
