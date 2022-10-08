module.exports = {
    createUser: async (model, payload) => {
        return await new model({
            ...payload,
            signUpType: 'Email'
        }).save();
    },

    getUserByPk: async (model, id) => {
        return await model.findById(id)
    },

    getUserByEmailPassword: async (model, email, password) => {
        return await model.findOne({ email, password, status: 'Active' })
    },

    getUserByEmail: async (email) => {
        return await model.findOne({ email })
    },

    getUserWithSocialIdAndEmail: async (model, socialLoginId, email, userType, signUpType) => {
        let queryArray = [{ socialLoginId }]
        if (email) {
            queryArray.push({ email })
        }
        let user = await model.findOne({
            $or: queryArray
        })

        if (!user) {
            let createObj = {
                socialLoginId, userType, signUpType
            }
            if (email) {
                createObj.email = email
            }
            user = await new model(createObj).save()
        }

        return user
    },

    updateSocialLoginId: async (model, _id, socialLoginId) => {
        return await model.findOneAndUpdate({ _id }, { socialLoginId }, {
            new: true
        });
    },

    updateOtp: async (model, _id, otp, verifyEmail) => {
        let update = { otp }
        if (verifyEmail) update['emailVerifiedAt'] = new Date();
        return await model.updateOne({ _id }, { $set: update })
    },

    findUserWithOtp: async (model, otp) => {
        return await model.findOne({ otp })
    },

    updatePassword: async (model, _id, password) => {
        return await model.updateOne({ _id }, { $set: { password } })
    }
}