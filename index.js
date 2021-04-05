const getData = require('./src/getData')
const util = require('util')

getData.getTeamData("FPC25HV6C2").then((data) => {
    console.error(util.inspect(data, false, null, true /* enable colors */))
}).catch((error) => {
    console.error(error);
});