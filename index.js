const app = require('./src/app');
const getData = require('./src/getData')
const db = require('./src/postgres')
const util = require('util')

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: ${process.env.IP}:${port}`);
  /* eslint-enable no-console */
});

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

/*
getData.getTeamData("FPC25HV6C2").then((Teamsdata) => {
    getData.getMemberData("FPC25HV6C2").then((Memberdata) => {
        
        Promise.all([db.WriteTeamStats(Teamsdata), db.WriteTeamProjects(Teamsdata), db.WriteMemberStats(Memberdata)]).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.error(error);
        });

    }).catch((error) => {
        console.error(error);
    });

}).catch((error) => {
    console.error(error);
});
*/

function getHourDE(date) {

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;
	
	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;

    return `${hour}${min}`
}

setInterval(function(){
    if(getHourDE(new Date()) === '2000'){
        db.GetTeams().then((data) => {
            data.map(TeamID => {
                getData.getTeamData(TeamID.teamid).then((Teamsdata) => {
                    getData.getMemberData(TeamID.teamid).then((Memberdata) => {
                    
                        Promise.all([db.WriteTeamStats(Teamsdata), db.WriteTeamProjects(Teamsdata), db.WriteMemberStats(Memberdata)]).then((result) => {
                            console.log(`Collected Stats of team: ${TeamID.teamid}`)
                        }).catch((error) => {
                            console.error(error);
                        });
                
                    }).catch((error) => {
                        console.error(error);
                    });
                }).catch((error) => {
                    console.error(error);
                });
            });
        });
    }
}, 60000);
