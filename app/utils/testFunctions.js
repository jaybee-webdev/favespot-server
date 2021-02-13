

  exports.validateAddressData = (data) => {
    let res = [];
    let address = {};
    data.forEach(a => {
      a.address_components.forEach(ab => {
        res.push(ab);

      })  
    })

    res.forEach(a => {
        if(!address.country){
            let cntry = a.types.find(ab => ab === 'country');
            if(cntry){
                address.country = a.long_name
            }
        }

        if(!address.zip){
            let zp = a.types.find(ab => ab === 'postal_code');
            console.log(zp)
            if(zp){
                address.zip = a.long_name
            }
        }
    })

   let arr = []
   Object.entries(address)
    .forEach(([key, value]) => {
        arr.push({[key]: value})
    })
    return arr
  };