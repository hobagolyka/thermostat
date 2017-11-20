/**
 * This middleware has one purpose: redirect to main page
 */
module.exports = function (where) {

    return function (req, res, next) {

        return res.redirect('/');
    };

};