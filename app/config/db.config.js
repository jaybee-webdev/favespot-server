module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  // module.exports = {
  //   HOST: process.env.HRK_DB_HOST,
  //   USER: process.env.HRK_DB_USER,
  //   PASSWORD: process.env.HRK_DB_PASS,
  //   DB: process.env.HRK_DB_NAME,
  //   dialect: "mysql",
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   }
  // };