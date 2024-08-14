const express = require('express');
const accountStatsCtrl = require('../../controllers/accountStatsCtrl/accountStatsCtrl');


const accounStatsRoute = express.Router();

accounStatsRoute.get("/api/accounts-statistics", accountStatsCtrl);

module.exports = accounStatsRoute;