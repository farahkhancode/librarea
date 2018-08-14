// #1
require("dotenv").config();
const User = require("./models").User;
const Collaborator = require("./models").Collaborator;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
// #2
  createUser(newUser, callback){
// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
         /*const sgMail = require('@sendgrid/mail');
         sgMail.setApiKey(process.env.SENDGRID_API_KEY);*/
         const msg = {
         to: newUser.email,
         from: 'donotreply@example.com',
         subject: 'Account Confirmation',
         text: 'Welcome to Blocipedia!',
         html: '<strong>Welcome to Blocipedia! Please log in to start creating and sharing content!</strong>',
       };
         sgMail.send(msg);
         callback(null, user);

       })
       .catch((err) => {
         console.log(err);
         callback(err);
    })
  },

  getUser(id, callback){
   let result = {};
   User.findById(id)
   .then((user) => {
     if(!user){
       callback(404);
     } else {
       result["user"] = user;
       Collaborator.scope({method: ["collaborationsFor", id]}).all()
       .then((collaborations) => {
         result["collaborations"] = collaborations;
         callback(null, result);
       })
       .catch((err) => {
         callback(err);
       })
     }
   })
 },


  upgrade(id, callback){
    return User.findById(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else {
        return user.updateAttributes({role: "premium"});
      }
    }) .catch((err) => {
      callback(err);
    })
  },

  downgrade(id, callback){
    return User.findById(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else {
        return user.updateAttributes({role: "standard"});
      }
    }) .catch((err) => {
      callback(err);
    })
  }
}
