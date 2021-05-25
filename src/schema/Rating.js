"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    value: {
        type: Schema.Types.Number,
        required: true
    },
    review: {
        type: Schema.Types.String,
        required: true
    },
    from : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    } 
});

RatingSchema.statics.create = function(obj) {
    const Rating = mongoose.model("Rating", RatingSchema);
    const rating = new Rating();
    rating.value = obj.value;
    rating.review = obj.review;
    rating.from = obj.from;
    rating.to = obj.to;
    return rating;
}

module.exports = mongoose.model("Rating", RatingSchema);
