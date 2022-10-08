const app = require("./app")
const http = require("http")
const server = http.createServer(app)
const { _lib, _config } = require('../modules')

// const https = require('https');
// const fs = require('fs');

// var dad = fs.readFileSync('/home/ubuntu/parkon_node_api/ssl/certificate_authority_bundle.pem', 'utf8')
// var privateKey = fs.readFileSync('/home/ubuntu/parkon_node_api/ssl/private_key.pem', 'utf8')
// var certificate = fs.readFileSync('/home/ubuntu/parkon_node_api/ssl/certificate.pem', 'utf8')
// var credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: dad
// };
// const server = https.createServer(credentials, app);


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