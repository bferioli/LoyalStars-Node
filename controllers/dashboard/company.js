const ErrorHelpers = require('../../helpers/error.js');

module.exports = (app, passport) => {
    const hydrateRewardStats = (reward) => {
        return new Promise( (resolve) => {
            Promise
                .all([
                    app.CheckinModel.getByReward(reward._id),
                    app.EarnedRewardModel.getByReward(reward._id)
                ])
                .then( ([checkins, earned]) => {
                    reward.checkins = checkins.length;
                    reward.earned = earned.length;
                    reward.redeemed = earned.filter( (earnedReward) => earnedReward.redeemed ).length;
                    resolve();
                })
                .catch(() => {
                });
        });
    };

    const DashboardCompanyController = (req, res) => {
        const data = {};
        app.CompanyModel.getBySlug(req.params.slug, req.user)
            .then( (company) => {
                data.company = company;
                return Promise.all([
                    app.LocationModel.getByCompany(company._id),
                    app.RewardModel.getByCompany(company._id)
                ]);
            })
            .then( ([locations, rewards]) => {
                data.locations = locations;
                data.rewards = rewards;
                const promises = [];
                data.rewards.forEach( (reward) => promises.push( hydrateRewardStats(reward) ) );
                return Promise.all(promises);
            })
            .then( () => {
                res.render('dashboard/company', { company: data.company, locations: data.locations, rewards: data.rewards, stripeKey: process.env.STRIPE_PUBLIC_KEY });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DashboardCompanyController;
};
