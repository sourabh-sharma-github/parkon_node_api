const commonUserModelObject = require('./common.user.model')
const { Schema, model } = require("mongoose");
const Owner = new Schema({
    ...commonUserModelObject
}, {
    collection: 'owner',
    timestamps: true
})
module.exports = model("Owner", Owner)