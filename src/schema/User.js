"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    username: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    bio: {
        type: Schema.Types.String
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: "Rating"
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

UserSchema.statics.create = function(obj) {
    const User = mongoose.model("User", UserSchema);
    const user = new User();
    user.name = obj.name;
    user.friends = obj.friends;
    user.username = obj.username;
    user.password = obj.password;
    user.bio = obj.bio;
    return user;
}

module.exports = mongoose.model("User", UserSchema);
