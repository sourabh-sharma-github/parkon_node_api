const { Properties } = require('../../models');

module.exports = {
    createProperty: async (userId, payload) => {
        return await new Properties({
            userId, ...payload,
        }).save();
    },

    // getPropertyForDashboard: async (_id) => {
    //     return await Properties
    //         .findOne({ _id })
    //         .select('_id createdAt floorOne floorTwo')
    // }

}