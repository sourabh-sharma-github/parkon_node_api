const { Schema, model } = require("mongoose");

const Properties = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        index: true,
        required: 'userId is required',
    },
    propertyName: {
        type: String,
        required: 'propertyName is required',
    },
    parkingType: {
        type: String,
        enum: {
            values: ['Hospital', 'Mall', 'Hotel', 'ParkingSpace', 'Other'],
            message: '{VALUE} is not valid parkingType'
        },
        required: 'parkingType is required',
    },
    location: {
        type: { type: String, required: true },
        streetAddress: { type: String, required: true },
        coordinates: [Number],
    },
    totalFloors: {
        type: Number,
        required: 'totalFloors is required',
    },
    floorOne: {
        type: Number,
        required: 'floorOne is required',
    },
    floorTwo: {
        type: Number,
        required: 'totalTwo is required',
    },
    entryPoints: {
        type: Number,
        required: 'entryPoints is required',
    },
    exitPoints: {
        type: Number,
        required: 'exitPoints is required',
    },
    isFreeParking: {
        type: Boolean,
        required: 'isFreeParking is required',
    },
    twoWheelerCharges: {
        type: Number,
        required: 'twoWheelerCharges is required',
        default: null
    },
    fourWheelerCharges: {
        type: Number,
        required: 'fourWheelerCharges is required',
        default: null
    },
}, {
    collection: 'properties',
    timestamps: true
})
Properties.index({ location: '2dsphere' });


module.exports = model("Properties", Properties)