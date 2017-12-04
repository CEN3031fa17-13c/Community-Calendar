'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Newabouts Permissions
 */
exports.invokeRolesPolicies = function () {//Allows access to APIs for different roles
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/newabouts',
      permissions: '*'
    }, {
      resources: '/api/newabouts/:newaboutId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/newabouts',
      permissions: ['get']
    }, {
      resources: '/api/newabouts/:newaboutId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/newabouts',
      permissions: ['get']
    }, {
      resources: '/api/newabouts/:newaboutId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Newabouts Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Newabout is being processed and the current user created it then allow any manipulation
  if (req.newabout && req.user && req.newabout.user && req.newabout.user.id === req.user.id) {
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
