const http = require('http');
const express = require('express');
// const socketio = require('socket.io');
const username = require('username-generator')
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require('dotenv').config();


//middleware
const app = express();
const server = http.createServer(app);
// const io = socketio(server);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


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
//     name: "restaurant",
//   });
// }

db.sequelize.sync();
// db.sequelize.drop({ force: true }).then().catch(err => {
//   console.log(err)
// })


//Socket IO
let users={}
let rests={}


io.on('connection', socket => {
    // let userid = username.generateUsername('-')
    const { id, type } = socket.handshake.query;
    // socket.join(restId)

    if(type === 'rests'){
      rests[id] = socket.id
    } 
    if(type === 'user'){
      users[id] = socket.id;
    }
    //send back username
    // socket.emit('yourID', userId)

    console.log({user: users})
    console.log({rests: rests})

    socket.on('addCart', (data)=> {
      console.log(data)
      io.to(rests[data.restId]).emit('upcoming', data);
    })  

    socket.on('checkOut', (data)=> {
      console.log(data)
      
      io.to(rests[data.restId]).emit('newOrder', data);
    })  

    socket.on('callUser', (data)=>{
        io.to(users[data.userToCall]).emit('hey', {signal: data.signalData, from: data.from})
    })
})


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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

