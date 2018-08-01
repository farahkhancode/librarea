const userQueries = require("../db/queries.users.js");
const passport = require("passport");


module.exports = {
  signUp(req, res, next){
    res.render("users/signup");
  },
  create(req, res, next){
//#1
     let newUser = {
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };
// #2
     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/signup");
       } else {
         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed in!");
           res.redirect("/");
         })
       }
     });
   }
}
