const Owners = require('../models/owners.model')
const Operators = require('../models/operators.model')
const Users = require('../models/users.model')
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jwt_please_change",
};

module.exports = passport.use(new Strategy(jwtOptions, async (payload, next, req, res) => {
    const { _id, userType } = payload;
    let MODEL = Users;
    
    switch (userType) {
        case 'Owner': MODEL = Owners; break;
        case 'Operator': MODEL = Operators; break;
        case 'generalUsers': MODEL = Users; break;
        default: MODEL = Users; break;
    }

    const user = await MODEL.findById(_id);
    if (user) {
        next(null, user);
    } else {
        return next({
            success: false,
            message: "User logout.",
            response: {
                user_deleted: true
            }
        });
    }
}))