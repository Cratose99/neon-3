// var bcrypt = require('bcryptjs');
// var User = require('../models/User2');
// const saltRounds = 10

// module.exports = (app) => {

//     app.post('/api/user/register', function (req, res, next) {
//         var username = req.body.username;
//         var password = req.body.password;

//         bcrypt.genSalt(saltRounds, function (err, salt) {
//             if (err) {
//                 throw err
//             } else {
//                 bcrypt.hash(password, salt, function (err, hash) {
//                     if (err) {
//                         throw err
//                     } else {
//                         // console.log(hash)
//                         var newUser = {
//                             username: username,
//                             password: hash
//                         }

//                         var user = new User(newUser);
//                         var result = user.save();
//                         res.send(result);
//                         res.send({message: "new User!!"})
//                     }
//                 })
//             }
//         })
//     })

//     app.post('/api/user/login', function (req, res, next) {
//         let username = req.body.username;
//         let password = req.body.password;

//         User.getUserByUsername(req.body.username, function (err, user) {
//             if (err) throw err;
//             if (!user) {
//                 return done(null, false, { message: 'Unknown User' });
//             }
// res.send("username is ", user)
// res.send({message: "new User is ", user})
//             User.comparePassword(password, user.password, function (err, isMatch) {
//                 if (err) throw err;
//                 if (isMatch) {
                   
//                     res.send({message: "password is correct! "})
//                     return done(null, user);
//                 } else {
//                     return done(null, false, { message: 'Invalid password' });
//                 }
//             });
//         });
//     })
// }