const mongoose = require('mongoose');

const userPasswordSchema = new mongoose.Schema({
    accessToken : {
        type : String,
        required : true,
        unique : true
    },

    isValid : {
        type : Boolean,
        default : true
    },
    user : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
});

const UserToken = mongoose.model('ResetTokens', userPasswordSchema);

module.exports = UserToken;