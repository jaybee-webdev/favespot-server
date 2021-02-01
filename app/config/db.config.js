module.exports = {
    HOST: "localhost",
    USER: "dbadmin",
    PASSWORD: "Wildcrack@420",
    DB: "favespot",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };