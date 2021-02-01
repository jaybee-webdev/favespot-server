
  exports.radiusLocator = (center, endPoint, rad) => {
    var ky = 40000 / 360;
      // console.log(center)
      // console.log(endPoint)
      // console.log(rad)
    var kx = Math.cos(Math.PI * center.lat / 180.0) * ky;
    var dx = Math.abs(center.lon - endPoint.lon) * kx;
    var dy = Math.abs(center.lat - endPoint.lat) * ky;
    // console.log(kx)
    // console.log(dx)
    // console.log(dy)

    console.log(Math.sqrt(dx * dx + dy * dy))

    return Math.sqrt(dx * dx + dy * dy) <= rad;
  };
  


// function arePointsNear(checkPoint, centerPoint, km) {
//     var ky = 40000 / 360;
//     var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
//     var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
//     var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
//     return Math.sqrt(dx * dx + dy * dy) <= km;
// }
