const { ParkingSlots, Properties } = require('../../models');

module.exports = {

    enterVehical: async (payload) => {
        return await new ParkingSlots({
            ...payload,
        }).save();
    },

    exitVehical: async (code, vehicalNumber) => {
        return await ParkingSlots.findOneAndUpdate(
            { code, vehicalNumber, vehicalExist: false }, { vehicalExist: true }, { new: true }
        )
    },

    getPropertiesSlotCount: async (propertyId) => {
        const property = await Properties
            .findOne({
                _id: propertyId
            })
            .select('_id floorOne floorTwo')

        const occupied_slots = await ParkingSlots.countDocuments({
            propertyId, vehicalEntry: true, vehicalExist: false
        })

        return {
            total_slots: parseInt(property.floorOne + property.floorTwo),
            occupied_slots
        }
    }
}