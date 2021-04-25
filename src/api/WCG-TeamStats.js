require('dotenv').config();
const express = require('express');
const rateLimit = require("express-rate-limit");
const Joi = require('joi');

const db = require('./../postgres')

const PluginConfig = {

}

/* Plugin info*/
const PluginName = "WCG-TeamStats";
const PluginRequirements = [];
const PluginVersion = "0.0.1";
const PluginAuthor = "BolverBlitz";
const PluginDocs = "docs.ebg.pw";

const limiter = rateLimit({
	windowMs: 60 * 1000, 
	max: 60
  });

const router = express.Router();


const getTeamSchema = Joi.object({
	teamid: Joi.string().trim().required().required().regex(/^[a-z\d\s\0-9]*$/i)
});

router.get('/getTeamStats', limiter, async (reg, res, next) => {
	try{
		const value = await getTeamSchema.validateAsync(reg.query);
		db.GetTeamStatsLatest(value.teamid).then((TeamStats) => {
			res.status(200);
			res.json(TeamStats)
		});
	}catch (error) {
		next(error);
	}
});

module.exports = {
	router: router,
	PluginName: PluginName,
	PluginRequirements: PluginRequirements,
	PluginVersion: PluginVersion,
	PluginAuthor: PluginAuthor,
	PluginDocs: PluginDocs
  };
