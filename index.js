const getData = require('./src/getData')
const db = require('./src/postgres')
const util = require('util')

/*
getData.getTeamData("FPC25HV6C2").then((data) => {
    db.WriteTeam(data).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.error(error);
    });
}).catch((error) => {
    console.error(error);
});
*/

getData.getTeamData("FPC25HV6C2").then((data) => {
    console.error(util.inspect(data, false, null, true))
    
    Promise.all([db.WriteTeamStats(data), db.WriteTeamProjects(data)]).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.error(error);
    });
    
}).catch((error) => {
    console.error(error);
});
