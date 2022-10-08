const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
module.exports = {
    name: {
        type: String, default: null
    },
    phone: {
        type: Number,
        unique: true,
        min: [10, 'Required 10 digit phone number, got {VALUE}'],
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    emailVerifiedAt: {
        type: Date,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    socialLoginId: {
        type: String,
        default: null,
    },
    userProfilImage: {
        type: String,
        default: null,
    },
    otp: {
        type: Number,
        min: [6, 'Required 6 digit OTP, got {VALUE}'],
        max: [6, 'Required 6 digit OTP, got {VALUE}'],
        default: null
    }, 
    signUpType: {
        type: String,
        enum: {
            values: ['Email', 'Google', 'Apple', 'Facebook'],
            message: '{VALUE} is not valid user type'
        },
        required: 'signUpType is required',
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'InActive', 'Deleted'],
            message: '{VALUE} is not valid status'
        },
        required: 'userType is required',
        default: "Active"
    },
}