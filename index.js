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
db.GetTeams().then((data) => {
    data.map(TeamID => {
        getData.getMemberData(TeamID.teamid).then((Memberdata) => {
        
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
});


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