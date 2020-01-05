
var User = require('../models/User3');

module.exports = (app) => {

    app.post('/api/user/register', function (req, res, next) {
      
        var testUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        
        // save user to database
        testUser.save(function(err) {
            if (err) throw err;
        
            // attempt to authenticate user
            User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason) {
                if (err) throw err;
        
                // login was successful if we have a user
                if (user) {
                    // handle login success
                    console.log('login success');
                    return;
                }
        
                // otherwise we can determine why we failed
                var reasons = User.failedLogin;
                switch (reason) {
                    case reasons.NOT_FOUND:
                    case reasons.PASSWORD_INCORRECT:
                        // note: these cases are usually treated the same - don't tell
                        // the user *why* the login failed, only that it did
                        break;
                    case reasons.MAX_ATTEMPTS:
                        // send email or otherwise notify user that account is
                        // temporarily locked
                        break;
                }
            });
        });
    })

    app.post('/api/user/login', function (req, res, next) {
        let username = req.body.username;
        let password = req.body.password;

        User.getAuthenticated(username, password, function(err, user, reason) {
            if (err) throw err;
    
            // login was successful if we have a user
            if (user) {
                // handle login success
                console.log('login success');
                return;
            }
    
            // otherwise we can determine why we failed
            var reasons = User.failedLogin;
            switch (reason) {
                case reasons.NOT_FOUND:
                case reasons.PASSWORD_INCORRECT:
                    // note: these cases are usually treated the same - don't tell
                    // the user *why* the login failed, only that it did
                    break;
                case reasons.MAX_ATTEMPTS:
                    // send email or otherwise notify user that account is
                    // temporarily locked
                    break;
            }
        });
})
}
// // create a user a new user
// var testUser = new User({
//     username: 'jmar777',
//     password: 'Password123'
// });

// // save user to database
// testUser.save(function(err) {
//     if (err) throw err;

//     // attempt to authenticate user
//     User.getAuthenticated('jmar777', 'Password123', function(err, user, reason) {
//         if (err) throw err;

//         // login was successful if we have a user
//         if (user) {
//             // handle login success
//             console.log('login success');
//             return;
//         }

//         // otherwise we can determine why we failed
//         var reasons = User.failedLogin;
//         switch (reason) {
//             case reasons.NOT_FOUND:
//             case reasons.PASSWORD_INCORRECT:
//                 // note: these cases are usually treated the same - don't tell
//                 // the user *why* the login failed, only that it did
//                 break;
//             case reasons.MAX_ATTEMPTS:
//                 // send email or otherwise notify user that account is
//                 // temporarily locked
//                 break;
//         }
//     });
// });