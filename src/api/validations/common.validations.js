const { Joi } = require('express-validation');
module.exports = {
    vSignUpWithEmail: {
        body: Joi.object({
            name: Joi.string().required(),
            phone: Joi.number().min(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).required()
    },
    vSocialSignUp: {
        body: Joi.object({
            socialLoginId: Joi.string().required(),
            email: Joi.string().email().optional(),
            signUpType: Joi.string().valid('Email', 'Google', 'Apple', 'Facebook').required(),
        })
        .required()
    },
    vSignIn: {
        body:Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).required()
    },
    vForgotPassword: {
        body: Joi.object({
            email: Joi.string().email().required(),
        }).required()
    },
    vChangePassword: {
        body: Joi.object({
            changeBy: Joi.number().valid(1, 2).required(),
            newPassword: Joi.string().required(),
            otp: Joi.when('changeBy', { is: 1, then: Joi.number().required() }),
            email: Joi.when('changeBy', { is: 2, then: Joi.string().email().required(), otherwise: Joi.string().empty() }),
            oldPassword: Joi.when('changeBy', { is: 2, then: Joi.string().required(), otherwise: Joi.string().empty() }),
        }).required()
    },
    vChangePassword: {
        body: Joi.object({
            changeBy: Joi.number().valid(1, 2).required(),
            newPassword: Joi.string().required(),
            otp: Joi.when('changeBy', { is: 1, then: Joi.number().required() }),
            email: Joi.when('changeBy', { is: 2, then: Joi.string().email().required(), otherwise: Joi.string().empty() }),
            oldPassword: Joi.when('changeBy', { is: 2, then: Joi.string().required(), otherwise: Joi.string().empty() }),
        }).required()
    },
    vGetWithPhone: {
        body: Joi.object({
            phone: Joi.number().min(10).required(),
        }).required()
    }
}