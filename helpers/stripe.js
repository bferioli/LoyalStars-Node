const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const helpers = {};

helpers.subscribeNewCustomer = ({ email, source, plan }) => {
    return new Promise( (resolve, reject) => {
        stripe.customers.create({ email, source, plan }, (err, customer) => {
            if (err)
                reject(err.message);
            else
                resolve(customer);
        });
    });
};

module.exports = helpers;