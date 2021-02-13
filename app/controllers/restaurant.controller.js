const { v4: uuidv4 } = require('uuid');
const config = require("../config/auth.config");
const db = require("../models");

const Restaurant = db.restaurant;
const Location = db.location;


const Op = db.Sequelize.Op;

var { validateRestaurantData, tsFormat, locFormat } = require('../utils/validators');
var { radiusLocator } = require('../utils/geolocator');

exports.createRestaurant = async (req, res) => {
  // Save User to Database
  let { errors, valid } = validateRestaurantData({...req.body.restaurantDetails, ...req.body.locationDetails});
  let tsText = await tsFormat(req.body.locationDetails);
  if(!valid) return res.status(400).json(errors);
  console.log(tsText)
  let nl = new Location({
   ...req.body.locationDetails, ...tsText, type: 'restaurant'
  })

  let loc = await nl.save();


  Restaurant.create({ id: uuidv4(), ...req.body.restaurantDetails, 
    // userId: req.userId
  })
    .then(rest => {
        rest.setLocations(loc).then(ul => {
          console.log(ul)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

      // req.user.addUserTypes([2]).then(ul => {
      //   console.log(ul)
      // })
      //   .catch(err => {
      //     res.status(500).send({ message: err.message });
      //   });
          res.send({ message: "Restaurant was created successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.getRestaurant = async (req, res) => {
  console.log('wewewe')
  let resId = req.params.restId;
 
  Restaurant.findByPk(resId, { 
    attributes: { exclude: ['userId']},
    include: { model: Location } 
})
.then(rs => {
  console.log(rs);
  res.status(200).json(rs);

})
.catch(err => {
  res.status(500).send({ message: err.message });
})

};


exports.getRestaurants = async (req, res) => {

  let lat = req.query.lat;
  let lng = req.query.lng;
 
  console.log(lat)
  console.log(lng)

  let loc = await locFormat({lat, lng});
  res.send(loc);
};


exports.getNearbyRestaurants = async (req, res) => {
  console.log(req.query)
  let lat = req.query.lat;
  let lng = req.query.lng;
  let rad = req.query.rad ? req.query.rad : 10;
  let restaurants = [];
  let loc = await locFormat({lat, lng});
  console.log(loc)
  Location.findAll({ where: {
    type: 'restaurant',
    [Op.or]: [...loc]
  },
  include: { model: Restaurant }
 })
  .then(rs =>{

   rs.forEach(a => {
     let rest = radiusLocator({lat, lng }, {lat: a.lat, lng: a.lng}, rad);
     console.log(rest);
     if(rest){
       restaurants.push(a);
     }
   })

   res.json(restaurants)

  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
};

