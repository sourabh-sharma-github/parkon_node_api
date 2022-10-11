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

            const { code, propertyId, vehicalNumber } = req.body
            const data = await _repo.exitVehical(code, propertyId, vehicalNumber)
            if (!data){
                throw new Error("Invalid code/vehical number")
            }
            
            return __SSR(res, "Vehical exited.");
        } catch (error) {
            return __SFR(res, error.message)
        }
    }


}