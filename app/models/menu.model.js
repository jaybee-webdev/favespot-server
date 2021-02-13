module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menus", {
      dishName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Menu;
  };