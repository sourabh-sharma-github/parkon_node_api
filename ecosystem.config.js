module.exports = {
  apps : [{
    name: "parkon_api_dev",
    script: "./src/server.js",
    env: {
      NODE_ENV: "development",
    },
    // env_production: {
    //   NODE_ENV: "production",
    // }
  }]
};
