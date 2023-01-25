const convertCoordinates = (lat, long, latDeg, longDeg) => {
    
    if (lat === '00' || lat === '01') {
        return {latitude: null, longitude: null}
    }

    // split latitude degrees decimal minutes string
    const latDegrees = parseInt(latDeg);
    const latMinutes = parseInt(lat.split(".")[0]);
    const latSeconds = parseInt(lat.split(".")[1].slice(0, -1));
    const latPole = lat.slice(-1);
    
    
    // split longitude degrees decimal minutes string
    const longDegrees = parseInt(longDeg);
    const longMinutes = parseInt(long.split(".")[0]);
    const longSeconds = parseInt(long.split(".")[1].slice(0, -1));
    const longPole = long.slice(-1);
    
    
    // convert latitude to decimal minutes
    const convertedLatitude = 
          latPole === "N" ? parseFloat((latDegrees + (latMinutes / 60) + (latSeconds / 3600)).toFixed(4))
                          : -Math.abs(parseFloat((latDegrees + (latMinutes / 60) + (latSeconds / 3600)).toFixed(4)));
    // convert logitude to decimal minutes
    const convertedLongitude = 
          longPole === "E" ? parseFloat((longDegrees + (longMinutes / 60) + (longSeconds / 3600)).toFixed(4))
                          : -Math.abs(parseFloat((longDegrees + (longMinutes / 60) + (longSeconds / 3600)).toFixed(4))); 
    
    // create converted decimal minutes coordinates object
    const converted = {
      latitude: convertedLatitude,
      longitude: convertedLongitude,
    }
    
    return converted;
  }

  module.exports = { convertCoordinates };