const _repo = require('../reositories/index');
const { __SSR, __SFR } = require('../../utils/index');

module.exports = {
    enterVehical: async (req, res) => {
        try {
            await _repo.enterVehical({
                ...req.body,
                vehicalEntry: true
            })
            return __SSR(res, "Vehical entered.");
        } catch (error) {
            return __SFR(res, error.message, error)
        }
    },

    exitVehical: async (req, res) => {
        try {

            const { code, vehicalNumber } = req.body
            const data = await _repo.exitVehical(code, vehicalNumber)
            if (!data) {
                throw new Error("Invalid code/vehical number")
            }

            return __SSR(res, "Vehical exited.");
        } catch (error) {
            return __SFR(res, error.message)
        }
    },

    slotsDashboard: async (req, res) => {
        try {
            const { propertyId } = req.body;
            const counts_obj = await _repo.getPropertiesSlotCount(propertyId);

            let newDate = new Date()
            let formatted_date = newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear()
            
            return __SSR(res, "Dashboard", {
                date: formatted_date,
                ...counts_obj
            });
        } catch (error) {
            return __SFR(res, error.message)
        }
    }
}