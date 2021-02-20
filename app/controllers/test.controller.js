const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const UserType = db.userType;
const Location = db.location;
const Restaurant = db.restaurant;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var { validateSignupData, tsFormat} = require('../utils/testValidators');
const { user, role, restaurant } = require("../models");


exports.signup = async (req, res) => {
  // Save User to Database
  console.log(uuidv4())
  let { firstName, lastName, email, mobile, password } = req.body.userDetails;
  console.log(req.body)
  let userData = { ...req.body.userDetails, ...req.body.locationDetails };
  let { errors, valid } = validateSignupData(userData);
  console.log(req.body.locationDetails);
  let tsText = await tsFormat(req.body.locationDetails);
  if(!valid) return res.status(400).json(errors);

  let nl = new Location({
   ...req.body.locationDetails, ...tsText, type: 'permanent'})

  let loc = await nl.save();

  User.create({
    id: uuidv4(), firstName, lastName, email, mobile, password: bcrypt.hashSync(password, 8)
  })
    .then(user => {

        user.setLocations(loc).then(ul => {
          console.log(ul)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

      user.setUserTypes([1]).then(() => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};




exports.getAllUsers = async (req, res) => {
  // Save User to Database
  console.log('getUsers')
  await User.findAll({
    attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
  })
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.createMenu = async (req, res) => {

  let restaurantId = req.params.restId;
  console.log(restaurantId)
  console.log(req.body)
  let { errors, valid } = validateMenuData(req.body);
  if(!valid) return res.status(400).json(errors);

  Menu.create({
    id: uuidv4(), ...req.body, restaurantId})
  .then(() => {
    res.json({message: 'Menu Created Successfully'});
})
.catch(err => {
  res.status(500).send({ message: err.message });
})

};

exports.createRestaurant = async (req, res) => {
  // Save User to Database
  console.log(req.body)
  let { errors, valid } = validateRestaurantData({...req.body.restaurantDetails, ...req.body.locationDetails});
  let tsText = await tsFormat(req.body.locationDetails);
  if(!valid) return res.status(400).json(errors);
  console.log(tsText)



  Restaurant.create({ id: uuidv4(), ...req.body.restaurantDetails, 
    // userId: req.userId
  })
    .then(rest => {
       Location.create({
        ...req.body.locationDetails, ...tsText, type: 'restaurant'
       }).then(loc => {
        rest.setLocations(loc).then(ul => {
          console.log(ul)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
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