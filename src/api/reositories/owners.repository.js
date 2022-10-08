const Owners = require('../../models/owners.model');

module.exports = {

    createUser: async (payload) => {
        return await new Owners({
            ...payload,
            signUpType: 'Email'
        }).save();
    },

    getUserByPk: async (id) => {
        return await Owners.findById(id)
    },

    getUserByEmailPassword: async (email, password) => {
        return await Owners.findOne({ email, password, status: 'Active' })
    },

    getUserByEmail: async (email) => {
        return await Owners.findOne({ email })
    },

    getUserWithSocialIdAndEmail: async (socialLoginId, email, userType, signUpType) => {
        let queryArray = [{ socialLoginId }]
        if (email) {
            queryArray.push({ email })
        }
        let user = await Owners.findOne({
            $or: queryArray
        })

        if (!user) {
            let createObj = {
                socialLoginId, userType, signUpType
            }
            if (email) {
                createObj.email = email
            }
            user = await new Owners(createObj).save()
        }

        return user
    },

    updateSocialLoginId: async (_id, socialLoginId) => {
        return await Owners.findOneAndUpdate({ _id }, { socialLoginId }, {
            new: true
        });
    },

    updateOtp: async (_id, otp, verifyEmail) => {
        let update = { otp }
        if (verifyEmail) update['emailVerifiedAt'] = new Date();
        return await Owners.updateOne({ _id }, { $set: update })
    },

    findUserWithOtp: async (otp) => {
        return await Owners.findOne({ otp })
    },

    updatePassword: async (_id, password) => {
        return await Owners.updateOne({ _id }, { $set: { password } })
    }
}