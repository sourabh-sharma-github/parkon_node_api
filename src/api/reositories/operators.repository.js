const _models = require('../../models/index');

module.exports = {

    createUser: async (payload) => {
        return await new _models.Operators({
            ...payload,
            signUpType: 'Email'
        }).save();
    },

    getUserByPk: async (id) => {
        return await _models.Operators.findById(id)
    },

    getUserByEmailPassword: async (email, password) => {
        return await _models.Operators.findOne({ email, password, status: 'Active' })
    },

    getUserByEmail: async (email) => {
        return await _models.Operators.findOne({ email })
    },

    getUserWithSocialIdAndEmail: async (socialLoginId, email, userType, signUpType) => {
        let queryArray = [{ socialLoginId }]
        if (email) {
            queryArray.push({ email })
        }
        let user = await _models.Operators.findOne({
            $or: queryArray
        })

        if (!user) {
            let createObj = {
                socialLoginId, userType, signUpType
            }
            if (email) {
                createObj.email = email
            }
            user = await new _models.Operators(createObj).save()
        }

        return user
    },

    updateSocialLoginId: async (_id, socialLoginId) => {
        return await _models.Operators.findOneAndUpdate({ _id }, { socialLoginId }, {
            new: true
        });
    },

    updateOtp: async (_id, otp, verifyEmail) => {
        let update = { otp }
        if (verifyEmail) update['emailVerifiedAt'] = new Date();
        return await _models.Operators.updateOne({ _id }, { $set: update })
    },

    findUserWithOtp: async (otp) => {
        return await _models.Operators.findOne({ otp })
    },

    updatePassword: async (_id, password) => {
        return await _models.Operators.updateOne({ _id }, { $set: { password } })
    },

    findWithPhone: async (phone) => {
        return await _models.Operators.findOne({ phone })
    },

    getWithEmailOrPhone: async (email, phone) => {
        return await _models.Operators.findOne({
            $or: [{ email }, { phone }],
            status: 'Active'
        })
    },

    updateOperator: async (_id, payload) => {
        return await _models.Operators.findOneAndUpdate({ _id }, payload, { new: true })
    },
}