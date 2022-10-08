'use strict';

const { _lib, _routes } = require('./../modules')
const { app, passport, morgan, cors, bodyParser, ValidationError } = _lib;

require('dotenv').config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
app.use('/api', _routes);
app.use('/', (req, res) => {
    res.statusCode = 200
    res.json(({
        success: true,
        message: "😎😘Hurray we are connected 🚀🚀"
    }))
    console.log();
});

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        if (err.details && err.details.body && err.details.body.length && err.details.body[0].message) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.details.body[0].message.replace(/"/g, ""),
            });
        } else {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
                response: err,
            });
        }
    }
    return res.status(500).json(err);
});


module.exports = app;