const { createUser, getUserWithSocialIdAndEmail, updateSocialLoginId, getUserByEmailPassword, getUserByEmail, updateOtp, findUserWithOtp, updatePassword } = require('../reositories/users.repository');
const { getJwtToken, __SSR, __SFR, randomNumber } = require('../../utils/index');

module.exports = {
    signupWithEmail: async (req, res) => {
        try {
            let user = await createUser(req.body);
            const token = getJwtToken(user._id, "generalUsers");
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
            let user = await getUserWithSocialIdAndEmail(socialLoginId, email, userType, signUpType);
            if (user && !user.socialLoginId) {
                user = await updateSocialLoginId(user._id, socialLoginId)
            }
            const token = getJwtToken(user._id, "generalUsers");
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
            const user = await getUserByEmailPassword(email, password)
            if (!user) throw new Error("Invalid email/password")
            const token = getJwtToken(user._id, "generalUsers");
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
            const user = await getUserByEmail(email);
            if (!user) throw new Error("Invalid email")
            const otp = await randomNumber()
            await updateOtp(user._id, otp)
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
                case 1: user = await findUserWithOtp(otp); break;
                case 2: user = await getUserByEmailPassword(email, oldPassword); break;
            }
            if (!user) throw new Error("Invalid input")
            await updatePassword(user._id, newPassword)
            await updateOtp(user._id, null)
            return __SSR(res, "Password changed.")
        } catch (error) {
            return __SFR(res, error.message)
        }
    }
}