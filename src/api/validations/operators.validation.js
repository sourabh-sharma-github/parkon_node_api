const { Joi } = require('express-validation');

const addUpdateOperatorCommon = {
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    alloCatedProperties: Joi.array().items({
        propertyId: Joi.string().required(),
        propertyName: Joi.string().required(),
    }).required(),
    isSuperOperator: Joi.boolean().required(),
    entryPoints: Joi.number().optional(),
    exitPoints: Joi.number().optional(),
}

module.exports = {
    ...require('./common.validations'),
    vAddOperator: {
        body: Joi.object({
            name: Joi.string().required(),
            userProfilImage: Joi.string().required(),
            ...addUpdateOperatorCommon
        }).required()
    },
    vUpdateOperator: {
        body: Joi.object({
            _id: Joi.string().optional(),
            ...addUpdateOperatorCommon
        }).required()
    }
}