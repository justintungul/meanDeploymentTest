const mongoose = require('mongoose');

module.exports = function() {
    var reviewSchema = new mongoose.Schema({
        name: { type: String, required: [true, 'Name cannot be blank'], minlength: [3, "Name must contain at least 3 characters"] },
        rating: { type: Number, min: [1, 'Rating must be between 1 - 5'], max: [5, 'Rating must be between 1 - 5'] },
        content: { type: String, required: [true, 'Review cannot be blank'], minlength: [3, "Review must contain at least 3 characters"] },
    }, {timestamps: true });

    var restaurantsSchema = new mongoose.Schema({
        name: { type: String, required: [true, 'Name cannot be blank'], minlength: [3, "Name must contain at least 3 characters"], unique: [true, "That restaurant already exists!"]},
        cuisine: { type: String, required: [true, 'Last name cannot be blank'], minlength: [3, "Cuisine must contain at least 3 characters"]},
        reviews: [reviewSchema]
    }, {timestamps: true });

    // var reviewSchema = new mongoose.Schema({
    //     name: { type: String },
    //     rating: { type: Number },
    //     image: { type: String },
    // }, {timestamps: true });

    // var restaurantsSchema = new mongoose.Schema({
    //     name: { type: String },
    //     cuisine: { type: String },
    //     reviews: [reviewSchema]
    // }, {timestamps: true });

    mongoose.model('Review', reviewSchema);
    mongoose.model('Restaurant', restaurantsSchema);
}