'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
     type: DataTypes.STRING,
     allowNull: false
     },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
     defaultValue: "standard"
  },
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     validate: {
       isEmail: { msg: "must be a valid email" }
        }
     },
     password: {
     type: DataTypes.STRING,
     allowNull: false
     }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Wiki, {
         foreignKey: "userId",
         as: "wikis"
       });
       User.prototype.isAdmin = function() {
         return this.role === "admin";
       };

       User.prototype.isPremium = function() {
         return this.role === "premium";
       };
       User.prototype.isStandard = function() {
         return this.role === "standard";
       };// associations can be defined here
  };


  return User;
};
