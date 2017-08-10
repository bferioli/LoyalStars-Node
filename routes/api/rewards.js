module.exports = (app, passport) => {
    const rewards = require('express').Router();

    // Reward query routes

    const RewardController = require('../../controllers/api/rewards/reward')(app);
    const DeleteRewardController = require('../../controllers/api/rewards/deleteReward')(app);
    const UpdateRewardController = require('../../controllers/api/rewards/updateReward')(app);

    rewards.get("/:rewardId", RewardController);
    rewards.delete("/:rewardId", passport.authenticate('jwt-verify'), DeleteRewardController);
    rewards.put("/:rewardId", passport.authenticate('jwt-verify'), UpdateRewardController);

    return rewards;
};