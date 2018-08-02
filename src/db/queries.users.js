// #1
const User = require("./models").User;
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
         const sgMail = require('@sendgrid/mail');
         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

}
