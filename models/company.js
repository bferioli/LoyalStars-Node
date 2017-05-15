module.exports = function(mongoose) {
    const CompanySchema = mongoose.Schema({
        slug: String,
        name: String,
        url: String,
        logo: String,
        industry: String,
        adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }, { collection: 'Company' });

    const CompanyModel = mongoose.model('Company', CompanySchema);

    CompanyModel.getAll = function(user) {
        const query = user.superUser ? this.find() : this.find({ adminUser: user._id });
        return query.exec();
    };

    CompanyModel.getById = function(id) {
        const query = this.findById(id);
        return query.exec();
    };

    CompanyModel.getBySlug = function(slug, user) {
        const query = this.findOne({ slug });
        return query.exec();
    };

    CompanyModel.updateById = function(id, model, user) {
        return new Promise( (resolve, reject) => {
            this.findById(id)
                .exec()
                .then( (company) => {
                    if (!location) {
                        reject('Company not found.');
                    } else if (user.superUser || company.adminUser.equals(user._id)) {
                        this.findOneAndUpdate({_id: id}, model, {new: true})
                            .exec()
                            .then( (updated) => resolve(updated) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    CompanyModel.deleteById = function(id, user) {
        return new Promise( (resolve, reject) => {
            this.findById(id)
                .exec()
                .then( (company) => {
                    if (!location) {
                        reject('Company not found.');
                    } else if (user.superUser || company.adminUser.equals(user._id)) {
                        this.findById(id)
                            .remove()
                            .exec()
                            .then( () => resolve({ deleted: true }) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    CompanyModel.savePromise = function(model, user) {
        if (!user.superUser && user._id !== model.adminUser)
            return Promise.reject('You are not an admin for this company.');
        return model.save();
    };

    return CompanyModel;
};
