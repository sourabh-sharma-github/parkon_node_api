const { ParkingSlots } = require('../../models');

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
    }
}