const Users = require('../../models/users.model');

module.exports = {

    createUser: async (payload) => {
        return await new Users({
            ...payload,
            signUpType: 'Email'
        }).save();
    },

    getUserByPk: async (id) => {
        return await Users.findById(id)
    },

    getUserByEmailPassword: async (email, password) => {
        return await Users.findOne({ email, password, status: 'Active' })
    },

    getUserByEmail: async (email) => {
        return await Users.findOne({ email })
    },

    getUserWithSocialIdAndEmail: async (socialLoginId, email, userType, signUpType) => {
        let queryArray = [{ socialLoginId }]
        if (email) {
            queryArray.push({ email })
        }
        let user = await Users.findOne({
            $or: queryArray
        })

        if (!user) {
            let createObj = {
                socialLoginId, userType, signUpType
            }
            if (email) {
                createObj.email = email
            }
            user = await new Users(createObj).save()
        }

        return user
    },

    updateSocialLoginId: async (_id, socialLoginId) => {
        return await Users.findOneAndUpdate({ _id }, { socialLoginId }, {
            new: true
        });
    },

    updateOtp: async (_id, otp, verifyEmail) => {
        let update = { otp }
        if (verifyEmail) update['emailVerifiedAt'] = new Date();
        return await Users.updateOne({ _id }, { $set: update })
    },

    findUserWithOtp: async (otp) => {
        return await Users.findOne({ otp })
    },

    updatePassword: async (_id, password) => {
        return await Users.updateOne({ _id }, { $set: { password } })
    }
}