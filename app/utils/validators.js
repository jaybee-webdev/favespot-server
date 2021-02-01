const moment = require('moment');

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
    if (data.confirmPassword !== data.password) errors.confirmPassword = 'Password must match!';
    
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

    if (!isEmail(data.email)) errors.email = 'Must be a valid email';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
  

  exports.tsFormat = (data) => {
      console.log(data)
      const propertyValues = Object.values(data);
     let tx = propertyValues.join('+').split(' ').join('+');
      console.log(propertyValues)
      console.log(tx)
    return tx
  
  }