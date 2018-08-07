'use strict';

const faker = require("faker");

//#2
let users = [{
  id: 1,
  username: "nylakhan",
  email: "nyla@test.com",
  password: "12345678",
  createdAt: new Date(),
  updatedAt: new Date(),
  role: "standard"
},
{
id: 2,
username: "yusufkhan",
email: "yusuf@test.com",
password: "12345888",
createdAt: new Date(),
updatedAt: new Date(),
role: "standard"
},
{
  id: 3,
  username: "aydinkhan",
  email: "aydin@test.com",
  password: "5678901",
  createdAt: new Date(),
  updatedAt: new Date(),
  role: "standard"
}];



module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
     return queryInterface.bulkDelete("Users", null, {});
  }
};
