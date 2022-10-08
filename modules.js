module.exports = {
    _models: require('./src/models/index'),
    _repos: require('./src/api/reositories/index'),
    _controllers: require('./src/api/controllers/index'),
    _validations: require('./src/api/validations/index'),
    _routes: require('./src/api/routes/index'),
    _lib: require('./dependencies'),
    _config: require('./src/config/index'),
    _utils: require('./src/utils/index')
}