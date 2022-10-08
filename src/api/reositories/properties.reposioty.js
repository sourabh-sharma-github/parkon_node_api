const Properties = require('../../models/properties.model');

module.exports = {
    createProperty: async (userId, payload) => {
        return await new Properties({
            userId, ...payload,
        }).save();
    },

    
}