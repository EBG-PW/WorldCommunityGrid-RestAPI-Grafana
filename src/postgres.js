const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

//Creat Table teams
pool.query(`CREATE TABLE IF NOT EXISTS teams (
    Name text,
    TeamId text PRIMARY KEY,
    Captain text,
    URL text,
    DateCreated date,
    Country text,
    Type text,
    BoincId integer,
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
    if (err) {console.log(err)}
    //Create Index for teams
    pool.query(`CREATE INDEX IF NOT EXISTS teams_TeamId_idx ON teams (TeamId)`, (err, result) => {
      if (err) {console.log(err)}
    });
});

//Creat Table teamstats
pool.query(`CREATE TABLE IF NOT EXISTS teamstats (
    TeamId text,
    CurrentMembers integer,
    CurrentMembersRank integer,
    AllTimeMembers integer,
    AllTimeMembersRank integer,
    AllTimeDevices integer,
    RunTime bigint,
    RunTimeRank integer,
    Points bigint,
    PointsRank integer,
    Results bigint,
    ResultsRank integer,
    RunTimePerDay integer,
    RunTimePerResult integer,
    PointsPerHourRunTime float,
    PointsPerDay float,
    PointsPerResult float,
    ResultsPerDay float,
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
    if (err) {console.log(err)}
    //Create Index for teamstats
    pool.query(`CREATE INDEX IF NOT EXISTS teamstats_TeamId_idx ON teamstats (TeamId)`, (err, result) => {
      if (err) {console.log(err)}
    });
});

//Creat Table teamstatsprojects
pool.query(`CREATE TABLE IF NOT EXISTS teamstatsprojects (
    TeamId text,
    ProjectName text,
    RunTime bigint,
    Points bigint,
    Results bigint,
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
    if (err) {console.log(err)}
    //Create Index for teamstatsprojects
    pool.query(`CREATE INDEX IF NOT EXISTS teamstatsprojects_TeamId_idx ON teamstatsprojects (TeamId)`, (err, result) => {
      if (err) {console.log(err)}
    });
});

//Creat Table teamstatsmember
pool.query(`CREATE TABLE IF NOT EXISTS teamstatsmember (
    TeamId text,
    UserName text,
    RunTime bigint,
    Points bigint,
    Results bigint,
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
    if (err) {console.log(err)}
    //Create Index for teamstatsmember
    pool.query(`CREATE INDEX IF NOT EXISTS teamstatsmember_TeamId_idx ON teamstatsmember (TeamId)`, (err, result) => {
      if (err) {console.log(err)}
    });
});

let WriteTeam = function(Data) {
  return new Promise(function(resolve, reject) {
    pool.query('INSERT INTO teams(Name,TeamId,Captain,URL,DateCreated,Country,Type,BoincId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',[
      Data.TeamStats.Team[0].Name[0], Data.TeamStats.Team[0].TeamId[0], Data.TeamStats.Team[0].Captain[0], Data.TeamStats.Team[0].URL[0], Data.TeamStats.Team[0].DateCreated[0], Data.TeamStats.Team[0].CountryCode[0], Data.TeamStats.Team[0].Type[0], Data.TeamStats.Team[0].BoincId[0]
    ], (err, result) => {
      if (err) {reject(err)}
      resolve(result)
    });
  });
}

let WriteTeamStats = function(Data) {
  return new Promise(function(resolve, reject) {
    pool.query('INSERT INTO teamstats(TeamId,CurrentMembers,CurrentMembersRank,AllTimeMembers,AllTimeMembersRank,AllTimeDevices,RunTime,RunTimeRank,Points,PointsRank,Results,ResultsRank,RunTimePerDay,RunTimePerResult,PointsPerHourRunTime,PointsPerDay,PointsPerResult,ResultsPerDay) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)',[
      Data.TeamStats.Team[0].TeamId[0], Data.TeamStats.StatisticsTotals[0].CurrentMembers[0], Data.TeamStats.StatisticsTotals[0].CurrentMembersRank[0], Data.TeamStats.StatisticsTotals[0].AllTimeMembers[0], Data.TeamStats.StatisticsTotals[0].AllTimeMembersRank[0],
      Data.TeamStats.StatisticsTotals[0].AllTimeDevices[0], Data.TeamStats.StatisticsTotals[0].RunTime[0], Data.TeamStats.StatisticsTotals[0].RunTimeRank[0], Data.TeamStats.StatisticsTotals[0].Points[0], Data.TeamStats.StatisticsTotals[0].PointsRank[0],
      Data.TeamStats.StatisticsTotals[0].Results[0], Data.TeamStats.StatisticsTotals[0].ResultsRank[0], Data.TeamStats.StatisticsAverages[0].RunTimePerDay[0], Data.TeamStats.StatisticsAverages[0].RunTimePerResult[0], Data.TeamStats.StatisticsAverages[0].PointsPerHourRunTime[0],
      Data.TeamStats.StatisticsAverages[0].PointsPerDay[0], Data.TeamStats.StatisticsAverages[0].PointsPerResult[0], Data.TeamStats.StatisticsAverages[0].ResultsPerDay[0]
    ], (err, result) => {
      if (err) {reject(err)}
      resolve(result)
    });
  });
}

let WriteTeamProjects = function(Data) {
  return new Promise(function(resolve, reject) {
    Data.TeamStats.TeamStatsByProjects[0].Project.map(project => {
      pool.query('INSERT INTO teamstatsprojects(TeamId,ProjectName,RunTime,Points,Results) VALUES ($1,$2,$3,$4,$5)',[
        Data.TeamStats.Team[0].TeamId[0], project.ProjectName[0], project.RunTime[0], project.Points[0], project.Results[0]
      ], (err, result) => {
        if (err) {reject(err)}
        resolve(result)
      });
    });
  });
}

let WriteMemberStats = function(Data) {
  return new Promise(function(resolve, reject) {

  });
}

module.exports = {
  WriteTeam,
  WriteTeamStats,
  WriteTeamProjects,
  WriteMemberStats
};