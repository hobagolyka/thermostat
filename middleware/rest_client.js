/* Middleware function for collecting data from Fibaro by REST GET method
 * /api/panels/heating
 */

var Client = require('node-rest-client').Client;
var options_auth = require('../config');
var client = new Client(options_auth);
var moment = require('moment');

module.exports = function () {

    return function (req, res, next) {
        // registering remote methods
        client.registerMethod("jsonMethod", "http://nyariattila.ddns.net:8989/api/panels/heating", "GET");

        client.methods.jsonMethod(function (data, response) {
            // parsed response body as js object
            // console.log(data);

            var name = (typeof data[0].name !== 'undefined') ? data[0].name : '';
            var current_temp = (typeof data[0].properties.currentTemperature !== 'undefined') ? data[0].properties.currentTemperature : 'x';
            var vacation_temp = (typeof data[0].properties.vacationTemperature !== 'undefined') ? data[0].properties.vacationTemperature : 'x';
            var hand_temp = (typeof data[0].properties.handTemperature !== 'undefined') ? data[0].properties.handTemperature : 'x';
            var hand_time = (typeof data[0].properties.handTimestamp !== 'undefined') ? data[0].properties.handTimestamp : 'x';

            var now = moment().format("X");

            res.tpl.mode = 'Schedule mode';

            if(now < hand_time){
                res.tpl.mode = 'Manual mode. End: ' + moment.unix(hand_time).format("YYYY/MM/DD HH:mm");
                console.log(res.tpl.mode);
            }

            if(vacation_temp !== 0){
                res.tpl.mode = 'Holiday mode';
            }

            res.tpl.current_temp = current_temp;
            res.tpl.vacation_temp = vacation_temp;
            res.tpl.hand_temp = hand_temp;
            res.tpl.hand_time = hand_time;
            res.tpl.name = name;

            return next();
        });
    };

};