const commonUserModelObject = require('./common.user.model')
const { Schema, model } = require("mongoose");
const Users = new Schema({
    ...commonUserModelObject
}, {
    collection: 'users',
    timestamps: true
})
module.exports = model("Users", Users)