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
    TeamId bigint,
    Captain text,
    URL text,
    DateCreated TIMESTAMP,
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
    TeamId bigint,
    CurrentMembers integer,
    CurrentMembersRank integer,
    AllTimeMembers integer,
    AllTimeMembersRank integer,
    AllTimeDevices integer,
    RunTime bigint,
    RunTimeRank integer,
    Points bigint,
    PointsRank integer,
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
    TeamId bigint,
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
    TeamId bigint,
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