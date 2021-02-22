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
var { validateSignupData, validateLoginData, tsFormat} = require('../utils/validators');
const { user, role, restaurant } = require("../models");


exports.signup = async (req, res) => {
  // Save User to Database
  console.log(req.body)
  let { firstName, lastName, email, mobile, password } = req.body;

 
  User.create({
    id: uuidv4(), firstName, lastName, email, mobile, password: bcrypt.hashSync(password, 8)
  })
    .then(user => {

      user.setUserTypes([1]).then(() => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles)
          });
        } else {
          // user role = 1
          user.setRoles([1])
        }
        return user
      })
      .then(usr => {
        console.log(usr);

         
  User.findByPk(user.id)
  .then(user => {

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

      var authorities = [];
      var userTypes = [];

      user.getUserTypes().then(usrType => {
        for (let i = 0; i < usrType.length; i++) {
          userTypes.push(usrType[i].name);
        }
      })

      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          roles: authorities,
          userTypes,
          accessToken: token,
          msg: 'User Registered Successfully'
        });
      });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
      
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

      var authorities = [];
      var userTypes = [];

      user.getUserTypes().then(usrType => {
        for (let i = 0; i < usrType.length; i++) {
          userTypes.push(usrType[i].name);
        }
      })

      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          roles: authorities,
          userTypes,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUserData = async (req, res) => {

    User.findByPk(req.userId, { attributes: { exclude: ['password']},
      include: [
        { model: Location },
        { model: Role },
        { model: UserType },
        { model: Restaurant, required: false }
        ]
  })
  .then(usr => {
    console.log(usr);
    res.status(200).json(usr);

  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })

    // await req.user.getRoles().then(roles => {
    //   // console.log(roles)
    //   for (let i = 0; i < roles.length; i++) {
    //     userRoles.push("ROLE_" + roles[i].name.toUpperCase());
    //   }
    // });

    // await req.user.getLocations().then(loc => {
    //   console.log(loc)
    // });


    // userData.roles = userRoles;
    // userData.locations = userLocations;
    // console.log(userData)
    // res.status(200).json(userData);
};


exports.UploadDp = (req, res) => {
  console.log('wewewewewew')
  // const uid = req.user.uid
let fileName = req.file.filename;
res.send(fileName)
// User.updateOne({_id: uid}, { dpUrl: staticUrl + fileName })
// .then(rs => {
//   res.status(201).json({ dpUrl: staticUrl + fileName})
// })
// .catch(err => {
//   res.status(400).json(err);
// })
}
