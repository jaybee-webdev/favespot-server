const axios = require('axios');
const config = require("../config/auth.config");
const db = require("../models");
const Location = db.location;
const Op = db.Sequelize.Op;

var { tsFormat, validateSignupData } = require('../utils/validators');

nearByUsers = (req, res, next) => {
   
    let zip = req.query.zip;

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
        // next();
  };

// userCoordinates = (req, res, next) => {


//     if(!valid) return res.status(400).json(errors);

//     axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${tsText}&key=${config.mapKey}`)
//     .then(rs => {
//         console.log(rs.data)
//         req.location = rs.data;
//         // next()
//         res.json(rs.data.results[0].geometry.location);
//     })
//     .catch(err => {

//         res.status(400).send(err)
//     })
// }





  const filter = {
    nearByUsers: nearByUsers
    // userCoordinates: userCoordinates
  };



  module.exports = filter;