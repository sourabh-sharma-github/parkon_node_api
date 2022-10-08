const { Joi } = require('express-validation');
module.exports = {
    vAddProperty: {
        body: Joi.object({
            propertyName: Joi.string().required(),
            parkingType: Joi.string().valid('Hospital', 'Mall', 'Hotel', 'ParkingSpace', 'Other').required(),
            streetAddress: Joi.string().required(),
            coordinates: Joi.array().items(Number).required(),
            totalFloors: Joi.number().required(),
            floorOne: Joi.number().required(),
            floorTwo: Joi.number().required(),
            entryPoints: Joi.number().required(),
            exitPoints: Joi.number().required(),
            isFreeParking: Joi.boolean().required(),
            twoWheelerCharges: Joi.when('isFreeParking', { is: true, then: Joi.number().required() }),
            fourWheelerCharges: Joi.when('isFreeParking', { is: true, then: Joi.number().required() }),
        }).required()
    },
}