const { Schema, model } = require("mongoose");


const validateEmail = function(string) {
    var re = /^\w[A-Z, 2]-\d{2,2}-\w[A-Z, 2]-\d{4,4}$/;
    return re.test(string)
};

const ParkingSlots = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        index: true,
        default: null
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Properties',
        index: true,
        required: 'propertyId is required',
    },
    code: {
        type: Number,
        required: 'code is required',
    },
    vehicalNumber: {
        type: String,
        trim: true,
        uppercase: true,
        required: 'vehicalNumber is required',
        validate: [validateEmail, 'Please fill vehical number'],
        match: [/^\w[A-Z, 2]-\d{2,2}-\w[A-Z, 2]-\d{4,4}$/, 'Please fill vehical number']
    },
    vehicalEntry: {
        type: Boolean,
        default: false,
    },
    vehicalExist: {
        type: Boolean,
        default: false,
    },
}, {
    collection: 'parking_slots',
    timestamps: true
})


module.exports = model("ParkingSlots", ParkingSlots)