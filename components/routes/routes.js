'use strict';

module.exports = exports = function (server) {
    require('../controllers/employees.controller')(server, 'employees');
}