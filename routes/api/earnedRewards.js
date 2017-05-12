module.exports = (app) => {
    const earnedRewards = require('express').Router();

    // Reward Flow Routes

    const EarnedRewardController = require('../../controllers/api/earnedRewards/earnedReward')(app);
    earnedRewards.get("/:earnedRewardId/:phone", EarnedRewardController);

    return earnedRewards;
};