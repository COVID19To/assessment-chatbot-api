'use strict'
module.exports = (sequelize, DataTypes) => {
  const NewCasesSubscribers = sequelize.define('NewCasesSubscribers', {
    Subscriber: DataTypes.STRING,
    PostalCode: DataTypes.STRING,
    Active: DataTypes.TINYINT(1)
  }, {})
  NewCasesSubscribers.associate = function (models) {
    // associations can be defined here
  }
  return NewCasesSubscribers
}
