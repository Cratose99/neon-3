
var User = require('../models/User2');


module.exports = (app) => {

    app.post('/api/user/register', function (req, res, next) {
        User.createUser(req.body, function (err, user) {
            if (err) throw err;
            return done(null, false, { message: 'Made new user' });

        })
    })

    app.post('/api/user/login', function (req, res, next) {
        let username = req.body.username;
        let password = req.body.password;

        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    })
}