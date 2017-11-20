/* Middleware function for collecting data from Fibaro by REST GET method
 * /api/panels/heating
 */

var options_auth = require('../config');
var Client = require('node-rest-client').Client;
var client = new Client(options_auth);
var moment = require('moment');

module.exports = function () {

    return function (req, res, next) {

        console.log(req.body);

        var args = {
            path: { "id": 4 },
            data: ""
        };
        return next();

    };

};