const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var { validateSignupData, validateLoginData } = require('../utils/validators');


exports.signup = (req, res) => {
  // Save User to Database
  let { firstName, lastName, email, mobile } = req.body;
  let { errors, valid } = validateSignupData(req.body);
  console.log(errors)
  console.log(valid)

  if(!valid) return res.status(400).json(errors);

  User.create({
    firstName, lastName, email, mobile, password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
          res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {

  let { errors, valid } = validateLoginData(req.body);
  if(!valid) return res.status(400).json(errors);
  
  User.findOne({
    where: {
      [Op.or]: [
        { email: req.body.email}, {mobile: req.body.email}
      ]
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};