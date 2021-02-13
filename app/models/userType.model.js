module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define("userTypes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return UserType;
  };