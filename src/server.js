const app = require("./app")
const http = require("http")
const server = http.createServer(app)
const { _lib, _config } = require('../modules')

_lib.mongoose
    .connect(_config.database_uri, {
        useNewUrlParser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => {
        console.info("Connected to database 📃")

    })
    .catch((err) => {
        console.error('Unable to connect to the database 🚫', err)
    });


try {
    server.listen(_config.port, () => {
        console.info(`Server is listing on port:: ${_config.port} ✨🎉`);
    })
} catch (err) {
    console.error("Error while establishing connection with server 🚫" + err);
}