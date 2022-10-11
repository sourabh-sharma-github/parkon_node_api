const _repo = require('../reositories/index');
const { __SSR, __SFR } = require('../../utils/index');

module.exports = {
    addSlot: async (req, res) => {
        try {
            await _repo.createSlot({
                ...req.body,
                vehicalEntry: true
            })
            return __SSR(res, "Slot added successfully.");
        } catch (error) {
            return __SFR(res, error.message, error)
        }
    }
}