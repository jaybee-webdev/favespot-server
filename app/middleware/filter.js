
const db = require("../models");
const Location = db.location;
const Op = db.Sequelize.Op;

nearByUsers = (req, res, next) => {
   
    let zip = req.query.zip;

    if(zip){
        Location.findAll({
            // where: {
            //     zip 
            // }
        })
        .then(rs => {
            req.nbUsers = rs
            next();
    
        })
        .catch(err => {
            console.log(err)
            next();
    
        })
    } else {
        next();
    }
  };

  const filter = {
    nearByUsers: nearByUsers
  };
  module.exports = filter;