const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    }
});

userSchema.methods.isPasswordValid = function(rawPassword, callback) {
    bcrypt.compare(rawPassword, this.password, function(err, same) {
        if (err) {
            callback(err);
        }
        callback(null, same);
    });
};

module.exports = model('User', userSchema);