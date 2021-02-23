const { v4: uuidv4 } = require('uuid');
const config = require("../config/auth.config");
const db = require("../models");

const Restaurant = db.restaurant;
const Location = db.location;
const Menu = db.menu;
const Category = db.category;
const Op = db.Sequelize.Op;

var { validateRestaurantData, tsFormat, locFormat, validateMenuData, validateCategoryData, formatRest } = require('../utils/validators');
var { radiusLocator } = require('../utils/geolocator');

exports.createRestaurant = async (req, res) => {
  // Save User to Database
  let { errors, valid } = validateRestaurantData({...req.body.restaurantDetails, ...req.body.locationDetails});
  let tsText = await tsFormat(req.body.locationDetails);
  if(!valid) return res.status(400).json(errors);


  Restaurant.create({ id: uuidv4(), ...req.body.restaurantDetails, 
    userId: req.userId, dpUrl: `${config.staticUrl}home-top.jpg`

  })
    .then(rest => {
      console.log(rest)
       Location.create({
        ...req.body.locationDetails, ...tsText, type: 'restaurant'
       }).then(loc => {
        rest.setLocations(loc);
       })
       .catch(err => {
        res.status(500).send({ message: err.message });
      });
    
      req.user.setUserTypes([2])
          res.send({ message: "Restaurant was created successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.getRestaurant = async (req, res) => {
  let resId = req.params.restId;
  console.log(resId)
  Restaurant.findByPk(resId, {
    attributes: { exclude: ['userId']},
    include: [{ model: Location }, { model: Menu, where: {isActive: true}, required: false }] 
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
   await Restaurant.findAll({
      include: [{ model: Location }, {model: Category}] 
    }, { raw: true })
    .then(rest => {
      let resto = [];
      rest.forEach(a => {
      obj = {}
      obj = a
        let arr = a.categories.map(ab => {return ab.name});
        a.categories = arr;
        a.foodTypes = arr;
        resto.push(a);
      })
      res.status(200).send(resto);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ msg: err.message });
    })
};


exports.getNearbyRestaurants = async (req, res) => {
  console.log(req.query)
  let lat = req.query.lat;
  let lng = req.query.lng;
  let rad = req.query.rad ? req.query.rad : 10;
  let restaurants = [];
  let loc = await locFormat({lat, lng});
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


exports.createMenu = async (req, res) => {

  let restaurantId = req.params.restId;

  let { errors, valid } = validateMenuData(req.body);
  if(!valid) return res.status(400).json(errors);

  let cat = await Category.findByPk(req.body.catId);
  Menu.create({
    id: uuidv4(), ...req.body, restaurantId})
  .then(mn => {
    mn.setCategories(cat);
    
    res.send({msg: 'Menu Created Successfully'});
})
.catch(err => {
  console.log(err)
  res.status(500).send({ message: err.message });
})
};

exports.getMenu = (req, res) => {

  const restaurantId = req.params.restId
  Menu.findAll({where: {restaurantId}})
  .then(cat => {
    res.json(cat);
})
.catch(err => {
  res.status(500).send({ msg: err.message });
})
};

exports.createCategory = async (req, res) => {
  console.log(req.restId)
  let { errors, valid } = validateCategoryData(req.body);
  if(!valid) return res.status(400).json(errors);
  let rest = await Restaurant.findByPk(req.restId);
  console.log(rest)
  Category.create({
   ...req.body, userId: req.userId})
  .then(cat => {
    rest.addCategories(cat)
    .then(rs => {
      console.log(rs)
    res.json(cat);
    })
    .catch(err => {
      console.log(err)
    })
})
.catch(err => {
  res.status(500).send({ msg: err.message });
})
};

exports.getCategory = (req, res) => {
  const userId = req.userId
  Category.findAll({ where: { userId } })
  .then(cat => {
    res.json(cat);
})
.catch(err => {
  res.status(500).send({ msg: err.message });
})
};




exports.setActiveMenu = (req, res) => {

  let restaurantId = req.params.restId;
  let status = req.params.status;
  let id = req.params.menuId;

  let isAct = status === 'op' ? 'Open' : status === 'bs' ? 'Busy' : 'Close';
  Menu.update({ status }, { where: { id }})
  .then(mn => {
    console.log(mn)
    res.json({message: `Menu is ${isAct}`});
})
.catch(err => {
  res.status(500).send({ message: err.message });
})
};

exports.setRestaurantStatus = (req, res) => {

  let id = req.params.restId;
  let status = req.params.status;
  let isAct = status ? 'Open' : 'Close'
  Restaurant.update({ isOpen: status }, { where: { id }})
  .then(mn => {
    console.log(mn)
    res.json({message: `Restaurant is ${isAct}`});
})
.catch(err => {
  res.status(500).send({ message: err.message });
})
};


