const _repo = require('../reositories/operators.repository');
const { getJwtToken, __SSR, __SFR, randomNumber } = require('../../utils/index');

module.exports = {
    signupWithEmail: async (req, res) => {
        try {
            let user = await _repo.createUser(req.body);
            const token = getJwtToken(user._id, "Operator");
            user = JSON.parse(JSON.stringify(user))
            delete user.password;
            return __SSR(res, "Signup successfully", { user, token });
        } catch (error) {
            return __SFR(res, error.message)
        }
    },

    socialSignUp: async (req, res) => {
        try {
            const { socialLoginId, email, userType, signUpType } = req.body;
            let user = await _repo.getUserWithSocialIdAndEmail(socialLoginId, email, userType, signUpType);
            if (user && !user.socialLoginId) {
                user = await _repo.updateSocialLoginId(user._id, socialLoginId)
            }
            const token = getJwtToken(user._id, "Operator");
            user = JSON.parse(JSON.stringify(user))
            delete user.password;
            return __SSR(res, "SignIn successfully", { user, token });

        } catch (error) {
            return __SFR(res, error.message, error)
        }
    },

    signIn: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await _repo.getUserByEmailPassword(email, password)
            if (!user) throw new Error("Invalid email/password")
            const token = getJwtToken(user._id, "Operator");
            return __SSR(res, "SignIn successfully", {
                id: user.id,
                token
            })
        } catch (error) {
            return __SFR(res, error.message, error)
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await _repo.getUserByEmail(email);
            if (!user) throw new Error("Invalid email")
            const otp = await randomNumber()
            await _repo.updateOtp(user._id, otp)
            return __SSR(res, "OTP sent to your email.")
        } catch (error) {
            return __SFR(res, error.message)
        }
    },

    changePassword: async (req, res) => {
        try {
            const { changeBy, otp, email, oldPassword, newPassword } = req.body;
            let user;
            switch (changeBy) {
                case 1: user = await _repo.findUserWithOtp(otp); break;
                case 2: user = await _repo.getUserByEmailPassword(email, oldPassword); break;
            }
            if (!user) throw new Error("Invalid input")
            await _repo.updatePassword(user._id, newPassword)
            await _repo.updateOtp(user._id, null)
            return __SSR(res, "Password changed.")
        } catch (error) {
            return __SFR(res, error.message)
        }
    },

    getOperatorWithPhone: async (req, res) => {
        try {
            const { phone } = req.body;
            let operator = await _repo.findWithPhone(phone);
            if (!operator) {
                return __SFR(res, "Operator doest exist.")
            }
            operator = JSON.parse(JSON.stringify(operator))
            delete operator.password;
            return __SSR(res, "Operator details", {
                operator
            })
        } catch (error) {
            return __SFR(res, error.message)
        }
    },

    addOperator: async (req, res) => {
        try {
            const { email, phone } = req.body
            let operator = await _repo.getWithEmailOrPhone(email, phone);
            if (operator) throw new Error('Operator with same email/phone exist')
            operator = await _repo.createUser(req.body)

            return __SSR(res, "Operator added successfully.", { operator });
        } catch (error) {
            return __SFR(res, error.message)
        }
    },

    updateOperator: async (req, res) => {
        try {
            const { _id } = req.body;
            const operator = await _repo.updateOperator(_id, req.body)
            if (!operator) {
                return __SFR(res, "Operator doesn't exist.")
            }
            return __SSR(res, "Operator updated successfully", {
                operator
            })
        } catch (error) {
            return __SFR(res, error.message)
        }
    }
}