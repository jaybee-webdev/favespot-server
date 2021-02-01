const axios = require('axios');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Location = db.location;
var { radiusLocator } = require('../utils/geolocator');
const { user } = require('../models');




exports.getCurrentLocation = (req, res) => {
    // Validate request
    console.log(req.query);

    let lat = req.query.lat;
    let lon = req.query.lon;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=&latlng=${lat},${lon}&key=${config.mapKey}`)
    .then(rs => {
        // console.log(rs.data.results)
        let loc = rs.data.results[0];
        let newLoc = new Location({
            lat, lon, zip: '6500'
        });

        newLoc.save(); 
        res.json(rs.data.results[0]);

    })
    .catch(err => {
        res.status(400).send(err)
    })

  };

  exports.getNearByUsers = (req, res) => {
    // Validate request
    // console.log(req.query.lat);
    // console.log(req.query.lon);
    // console.log(req.query.rad);

    console.log(req.nbUsers.length);

    let nbUsers = req.nbUsers;
    let rad = req.query.rad
    let center = {
        lat: req.query.lat,
        lon: req.query.lon
    }

    let arr = [];

    nbUsers.forEach(a => {
        let endPoint = {
            lat: a.lat,
            lon: a.lon
        }
        if(radiusLocator(center, endPoint, rad)){
            arr.push(a);
        }
    })
    

    console.log(arr.length)
    res.json(arr)
    // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlon}&radius=1500&key=${config.mapKey}`)
    // .then(rs => {
    //     console.log(rs.data)
    //     res.json(rs.data);
    // })
    // .catch(err => {
    //     res.status(400).send(err)
    // })

  };


  exports.getNearBy = (req, res) => {
    // Validate request
    console.log(req.query);

    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${config.mapKey}`)
    .then(rs => {
        // console.log(rs.data.results)
        res.json(rs.data.results[0]);
    })
    .catch(err => {
        res.status(400).send(err)
    })

  };

   