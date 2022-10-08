const express = require("express")
const { ValidationError } = require("express-validation")


module.exports = {
    app: express(),
    passport: require('passport'),
    morgan: require("morgan"),
    cors: require("cors"),
    bodyParser: require("body-parser"),
    ValidationError,
    mongoose: require('mongoose')
}