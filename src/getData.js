require('dotenv').config();
const request = require("request");
const parseString = require('xml2js').parseString;

let getTeamData = function(TeamID) {
	return new Promise(function(resolve, reject) {
        request(`https://secure.worldcommunitygrid.org/team/viewTeamInfo.do?teamId=${TeamID}&xml=true`, { json: false }, (err, res, body) => {
            if (err || typeof(body) === "undefined" || res.statusCode === 503){
                reject(new Error `Connection error ${res.statusCode}`)
                console.log("[getData.getTeamData] \x1b[31m[ER]\x1b[0m API didn´t respont in time.");
            }else{
                parseString(body, function (err, result) {
                    resolve(result);
                });
            }
        });
    });
};

module.exports = {
	getTeamData
};