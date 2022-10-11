const { ParkingSlots } = require('../../models');

module.exports = {

    createSlot: async (payload) => {
        return await new ParkingSlots({
            ...payload,
        }).save();
    },

    getSlotByCode: async (code) => {
        return await ParkingSlots.findOne({ code })
    },

    updateSlotExist: async (code) => {
        return await ParkingSlots.findOneAndUpdate(
            { code }, { vehicalExist: true }, { new: true }
        )
    } 
}