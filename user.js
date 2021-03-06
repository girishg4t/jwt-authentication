const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/testUser', { useMongoClient: true });

mongoose.Promise = global.Promise;


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', function (next) {

    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, function (err, hashPassword) {
                user.password = hashPassword;
                next();
            });
        });

    } else {
        next();
    }
});

UserSchema.methods.toJSON = function () {

    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email',]);
}

UserSchema.methods.generateAuthToken = function () {

    var user = this;
    var access = "auth";
    var token = jwt.sign({ _id: user._id.toHexString(), access }, '123abc').toString();

    user.tokens.push({ access, token });
    return user.save().then((result) => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);


module.exports = { User };