const { sign } = require("jsonwebtoken");
const { secret } = require('../config/index')

module.exports = {
    getJwtToken: (_id, userType) => {
        return "Bearer " + sign({ _id, userType }, secret, {
            expiresIn: "1d"
        })
    },

    __SSR: (res, message, data) => {
        let send = { success: true, message, data }
        if (data == null) delete send.data
        return res.status(200).json(send);
    },

    __SFR: (res, message, error) => {
        let send = { success: false, message, error };
        if (error == null) delete send.error;
        return res.status(400).json(send);
    },

    randomNumber: () => {
        return Math.floor(100000 + Math.random() * 900000)
    }
}