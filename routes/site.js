var renderMW = require('../middleware/render');
var restMW = require('../middleware/rest_client');
var set_vacMW = require('../middleware/set_vac');
var set_handMW = require('../middleware/set_hand');
var redirectMW = require('../middleware/redirect');

module.exports = function(app) {
    app.get('/',
        restMW(),
        renderMW('index', 'Thermostat')
    );

    app.use('/set_vac',
        set_vacMW(),
        redirectMW()
    );

    app.use('/set_hand',
        set_handMW(),
        redirectMW()
    );
};