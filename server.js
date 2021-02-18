const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();
require('dotenv').config();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/static', express.static(path.join(process.cwd(), 'resources')))



const db = require("./app/models");



const Role = db.role;
const UserType = db.userType;


// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });

//   UserType.create({
//     id: 1,
//     name: "consumer"
//   });
//   UserType.create({
//     id: 2,
//     name: "restaurant"
//   });
// }

db.sequelize.sync();


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/location.routes')(app);
require('./app/routes/restaurant.routes')(app);


require('./app/routes/test.routes')(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to favespot back-end server.",
path: process.cwd()  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

