module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
    
      streetAddress: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      formatted_address: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
      },
      placeId: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });
  
    return Location;
  };