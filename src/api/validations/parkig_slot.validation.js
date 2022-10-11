const { Joi } = require('express-validation');
module.exports = {
    vEnterExitVehical: {
        body: Joi.object({
            propertyId: Joi.string().required(),
            code: Joi.number().required(),
            vehicalNumber: Joi.string().regex(/^\w[A-Z, 2]-\d{2,2}-\w[A-Z, 2]-\d{4,4}$/).required(),
        }).required()
    },
}