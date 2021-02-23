const moment = require('moment');
const axios = require('axios');
const config = require("../config/auth.config");
var { validateAddressData } = require('./testFunctions');

//  const typeOf = (string, tp) => {
//    let val;
//    let dt = typeof string;
//   if(string === null || string === undefined){
//     val = tp === 'number' ? 0 : tp === 'string' ? string : tp === 'date' ? new Date() : tp === 'boolean' ? false : '';
//   } else {
//     if(dt === tp){
//       val = string;
//     } else {
//       val = tp === 'number' ? 0 : tp === 'string' ? string : tp === 'date' ? new Date() : tp === 'boolean' ? false : '';
//     }
//   }
//   return val
//   };

//   const dater = (data) => {
//     let res = {};
//     let rs;
//     let nw = moment();

//       if(data !== null && data !== undefined){
//         let dt = String(data).split('-');
//         let yr = dt[2] < 20 ? '20' + dt[2] : '19' + dt[2]; 
//          let rss = dt[1] + ' ' + dt[0] + ', ' + yr;
//           rs = moment(rss).format();
//       } else {
//        rs = moment().format();
//       }
//       res.birthDate = rs
//       res.age = nw.diff(rs, 'years');

//     return res
//   }


const formLocation = (data) => {
  console.log(data.results[0])
    let { formatted_address, geometry: { location }, place_id } = data.results[0];
    return { formatted_address, placeId: place_id, ...location }
}


const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email === null || email === undefined) return false
    if (email.match(regEx)) return true;
    else return false;
  };
  
  const isEmpty = (string) => {
      if(string === undefined || string === null ){
         return true
      } else {
        if (string.trim() === '') return true;
        else return false;
      }
  };
  
  exports.validateSignupData = (data) => {
    let errors = {};
    
    if (!isEmail(data.email)) errors.email = 'Must be a valid email';
    if (isEmpty(data.firstName)) errors.firstName = 'First Name must not be empty';
    if (isEmpty(data.lastName)) errors.lastName = 'Last Name must not be empty';
    if (isEmpty(data.mobile)) errors.mobile = 'Mobile # must not be empty';
    if (isEmpty(data.password)) errors.password = 'Password must not be empty';
    // if (data.confirmPassword !== data.password) errors.confirmPassword = 'Password must match!';
   

    if(Object.keys(errors).length !== 0){
      errors.msg = 'Incomplete Details';
      errors.variant = 'error';
    }

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
  exports.validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  

  exports.validateRestaurantData = (data) => {
    let errors = {};

    if (isEmpty(data.name)) errors.name = 'Restaurant Name must not be empty';
    if (isEmpty(data.contactName)) errors.contactName = 'Contact Name must not be empty';
    if (isEmpty(data.businessNum)) errors.businessNum = 'Business # must not be empty';
    if (!isEmail(data.businessEmail)) errors.businessEmail = 'Business Email must be a valid email';
    if (isEmpty(data.streetAddress)) errors.streetAddress = 'Street Address must not be empty';
    if (isEmpty(data.city)) errors.city = 'City must not be empty';
    if (isEmpty(data.state)) errors.state = 'State must not be empty';
    if (isEmpty(data.country)) errors.country = 'Country must not be empty';
    if (isEmpty(data.zip)) errors.zip = 'Postal Code must not be empty';

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

    
  exports.validateLocationData = (data) => {
    let errors = {};

    if (isEmpty(data.streetAddress)) errors.streetAddress = 'Street Address must not be empty';
    if (isEmpty(data.city)) errors.city = 'City must not be empty';
    if (isEmpty(data.state)) errors.state = 'State must not be empty';
    if (isEmpty(data.country)) errors.country = 'Country must not be empty';
    if (isEmpty(data.zip)) errors.zip = 'Postal Code must not be empty';

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  exports.validateMenuData = (data) => {
    let errors = {};
    console.log(data)
    if (isEmpty(data.name)) errors.name = 'Name of dish must not be empty';
    if (isEmpty(data.price)) errors.price = 'Price must not be empty';
   
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  

  exports.validateCategoryData = (data) => {
    let errors = {};
    if (isEmpty(data.name)) errors.name = 'Name of dish must not be empty';
    if (isEmpty(data.type)) errors.type = 'Type must not be empty';
   
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  


  exports.isResto = (data) => {
    let isRestaurant = false;
    data.map(a => {
        if(a.name === 'restaurant'){
            isRestaurant = true;
        }
    })
    return isRestaurant
}

exports.formatRest = (data) => {
  let ft = [];

  data.forEach(a => {
    ft.push(a.name);
  })
  // console.log(ft)
  return ft
}

  



  exports.tsFormat = (data) => {
      const propertyValues = Object.values(data);
     let tx = propertyValues.join('+').split(' ').join('+');
     
   let locString = axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${tx}&key=${config.mapKey}`)
      .then(rs => {
        let loc = formLocation(rs.data)
        if(data.lat){
          loc.lat = data.lat
        }
        if(data.lat){
          loc.lng = data.lng
        }
        console.log(data.lat)
        console.log(data.lng)

        return loc
          // res.json(rs.data);
      })
      .catch(err => {
        return err
          // res.status(400).send(err)
      })

     
    return locString;
  
  }

  exports.locFormat = async (data) => {
    let { lat, lng} = data;
 let locString = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.mapKey}`)
    .then(rs => {
         
        return validateAddressData(rs.data.results)
      // return formLocation(rs.data)
    })
    .catch(err => {
      return err
        // res.status(400).send(err)
    })
  return locString;
}

exports.fileNamer = async (data) => {
  let rs = String(data);
  let res = rs.replace(/\s+/g, '');
  console.log('wewe' + res);
  return res;
}


// axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlon}&radius=1500&key=${config.mapKey}`)
    // .then(rs => {
    //     console.log(rs.data)
    //     res.json(rs.data);
    // })
    // .catch(err => {
    //     res.status(400).send(err)
    // })

     // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlon}&radius=1500&key=${config.mapKey}`)
    // .then(rs => {
    //     console.log(rs.data)
    //     res.json(rs.data);
    // })
    // .catch(err => {
    //     res.status(400).send(err)
    // })

    //     axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${config.mapKey}`)
//     .then(rs => {
//         // console.log(rs.data.results)
//         res.json(rs.data.results[0]);
//     })
//     .catch(err => {
//         res.status(400).send(err)
//     })


