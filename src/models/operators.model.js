const { Schema, model } = require("mongoose");
const commonUserModelObject = require('./common.user.model')
const Operators = new Schema({
    ...commonUserModelObject,
    isSuperOperator: {
        type: Boolean,
        required: 'isSuperOperator is required',
        default: false
    },
    alloCatedProperties: [{
        propertyId: {
            type: Schema.Types.ObjectId,
            ref: 'Properties',
            required: 'propertyId required'
        },
        propertyName: {
            type: String,
            required: 'propertyName required'
        },
    }],
    entryPoints: {
        type: Number,
        default: null
    },
    exitPoints: {
        type: Number,
        default: null
    },
}, {
    collection: 'operators',
    timestamps: true
})
module.exports = model("Operators", Operators)