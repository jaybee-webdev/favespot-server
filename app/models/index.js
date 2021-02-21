const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
}); 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.userType = require("./userType.model.js")(sequelize, Sequelize);
db.location = require("./location.model.js")(sequelize, Sequelize);
db.restaurant = require("./restaurant.model.js")(sequelize, Sequelize);
db.menu = require("./menu.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);





db.user.hasMany(db.restaurant);
db.restaurant.belongsTo(db.user);

db.restaurant.hasMany(db.menu);
db.menu.belongsTo(db.restaurant);

//Locations
db.user.belongsToMany(db.location, {
  through: "user_locations",
  foreignKey: "userId",
  otherKey: "locationId"
})

db.location.belongsToMany(db.user, {
  through: "user_locations",
  foreignKey: "locationId",
  otherKey: "userId"
})

db.restaurant.belongsToMany(db.location, {
  through: "restaurant_locations",
  foreignKey: "locationId",
  otherKey: "restaurantId"
})

db.location.belongsToMany(db.restaurant, {
  through: "restaurant_locations",
  foreignKey: "restaurantId",
  otherKey: "locationId"
})

//Food Types
db.restaurant.belongsToMany(db.category, {
  through: "food_types",
  foreignKey: "categoryId",
  otherKey: "restaurantId"
})

db.category.belongsToMany(db.restaurant, {
  through: "food_types",
  foreignKey: "restaurantId",
  otherKey: "categoryId"
})

//Menu Type


//User Types
db.userType.belongsToMany(db.user, {
  through: "user_types",
  foreignKey: "userId",
  otherKey: "userTypeId"
});

db.user.belongsToMany(db.userType, {
  through: "user_types",
  foreignKey: "userTypeId",
  otherKey: "userId"
});


//Roles
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

//Categories
db.menu.belongsToMany(db.category, {
  through: "menu_categories",
  foreignKey: "categoryId",
  otherKey: "menuId"
})

db.category.belongsToMany(db.menu, {
  through: "menu_categories",
  foreignKey: "menuId",
  otherKey: "categoryId"
})

db.user.belongsToMany(db.category, {
  through: "user_category",
  foreignKey: "categoryId",
  otherKey: "userId",
  
})

db.category.belongsTo(db.user, {
  as: "user_category",
  foreignKey: "userId",
})




db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

