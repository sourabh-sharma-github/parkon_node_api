const { createProperty } = require('../reositories/properties.reposioty');
const { __SSR, __SFR } = require('../../utils/index');
module.exports = {
    addProperty: async (req, res) => {
        try {
            const { _id } = req.user;
            const {streetAddress, coordinates } = req.body;
            let payload  = {
                ...req.body,
                location: {
                    type: "Point",
                    streetAddress,
                    coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])]
                }
            }
            await createProperty(_id, payload)
            return __SSR(res, "Property added successfully.");
        } catch (error) {
            return __SFR(res, error.message, error)
        }
    }
}