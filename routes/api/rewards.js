module.exports = (app) => {
    const rewards = require('express').Router();

    // Reward query routes

    const RewardController = require('../../controllers/api/rewards/reward')(app);
    const DeleteRewardController = require('../../controllers/api/rewards/deleteReward')(app);
    const UpdateRewardController = require('../../controllers/api/rewards/updateReward')(app);

    rewards.get("/:rewardId", RewardController);
    rewards.delete("/:rewardId", DeleteRewardController);
    rewards.put("/:rewardId", UpdateRewardController);

    return rewards;
};