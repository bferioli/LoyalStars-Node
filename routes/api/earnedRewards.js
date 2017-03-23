module.exports = (app) => {
    const earnedRewards = require('express').Router();

    // Reward Flow Routes

    const EarnedRewardController = require('../../controllers/api/earnedRewards/earnedReward')(app);
    earnedRewards.get("/:earnedRewardId/:phone", EarnedRewardController);

    // Reward query routes

    const EarnedRewardsController = require('../../controllers/api/earnedRewards/earnedRewards')(app);
    earnedRewards.get("/", EarnedRewardsController);

    return earnedRewards;
};