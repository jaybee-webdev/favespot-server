module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurants", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      contactName: {
        type: Sequelize.STRING
      },
      businessNum: {
        type: Sequelize.STRING
      },
      businessEmail: {
        type: Sequelize.STRING
      },
      isOpen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dpUrl: {
        type: Sequelize.STRING

      }
    });
  
    return Restaurant;
  };