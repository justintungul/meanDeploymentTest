const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const Review = mongoose.model('Review');

module.exports = {
    getAllReviews: (req, res) => {
        Review.find({}, (err, reviews) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get All Reviews", data: err})
            } else {
                console.log(reviews)
                res.json({status: true, message: "Get All Reviews", data: reviews})
            }
        })
    },
    // getReviewById: (req, res) => {
    //     Review.find({_id: req.params.id}, (err, review) => {
    //         if (err) {
    //             console.log(err)
    //             res.json({status: false, message: "Get Review By Id", data: err})
    //         } else {
    //             console.log(review)
    //             res.json({status: true, message: "Get Review By Id", data: review})
    //         }
    //     })
    // },
    createReview: (req, res) => {
        Review.create(req.body, (err, review) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Create Review", data: err})
            } else {
                console.log(review)
                Restaurant.findOneAndUpdate({_id: req.params.id}, {$push: { reviews: review }}, (err, user) => {
                    if (err) {
                        console.log(err)
                        res.json({status: false, message: "Add Review to Restaurant", data: err})
                    } else {
                        console.log(user)
                        res.json({status: true, message: "Add Review to Restaurant", data: user})
                    }
                })
            }
        })
        // Review.create(req.body, (err, review) => {
        //     if (err) {
        //         console.log(err)
        //         res.json({status: false, message: "Create Review", data: err})
        //     } else {
        //         console.log(review)
        //         Restaurant.findOneAndUpdate({"_id": req.params.id}, 
        //             { "$push": { 
        //                     "reviews": [review],
        //                     "$sort": { "rating": -1 }
        //                 }
        //             }, (err, user) => {
        //                 if (err) {
        //                     console.log(err)
        //                     res.json({status: false, message: "Add Review to Restaurant", data: err})
        //                 } else {
        //                     console.log(user)
        //                     res.json({status: true, message: "Add Review to Restaurant", data: user})
        //                 }
        //         })
        //     }
        // })
    },
    // updateReviewById: (req, res) => {
    //     Review.findOne({_id: req.params.reviewId}, (err, reviewOld) => {
    //         reviewOld.title = req.body.title;
    //         reviewOld.description = req.body.description;
    //         reviewOld.save((err, reviewNew) => {
    //             if (err) {
    //                 console.log(err)
    //                 res.json({status: false, message: "Update Review", data: err})
    //             } else {
    //                 console.log(reviewNew)
    //                 // res.json({status: true, message: "Update Review", data: reviewNew})
    //                 Restaurant.findOne({_id: req.params.restaurantId}, (err, restoOld) => {
    //                     let reviews = restoOld.reviews;
    //                     for (var i = 0; i < reviews.length; i++) {
    //                         if (reviews[i]['_id'] == req.params.reviewId) {
    //                             reviews[i].title = req.body.title;
    //                             reviews[i].description = req.body.description;
    //                         }
    //                     }
    //                     restoOld.reviews = reviews;
    //                     restoOld.save((err, restoNew) => {
    //                         if (err) {
    //                             console.log(err)
    //                             res.json({status: false, message: "Update Review from Restaurant", data: err})
    //                         } else {
    //                             console.log(restoNew)
    //                             res.json({status: true, message: "Update Review from Restaurant", data: restoNew})
    //                         }
    //                     })
    //                 })
    //             }
    //         })
    //     })
    // },
    nukeReviewById: (req, res) => {
        Review.deleteOne({_id: req.params.reviewId}, (err) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Delete Review", data: err})
            } else {
                console.log("Delete")
                Restaurant.findOne({_id: req.params.restaurantId}, (err, restoOld) => {
                    let reviews = restoOld.reviews;
                    for (var i = 0; i < reviews.length; i++) {
                        if (reviews[i]['_id'] == req.params.reviewId) {
                            reviews.splice(i,1);
                        }
                    }
                    restoOld.reviews = reviews;
                    restoOld.save((err, restoNew) => {
                        if (err) {
                            console.log(err)
                            res.json({status: false, message: "Delete Review from Restaurant", data: err})
                        } else {
                            console.log(restoNew)
                            res.json({status: true, message: "Delete Review from Restaurant", data: restoNew})
                        }
                    })
                })
            }
        })
    },
    getReviewByResto: (req, res) => {
        var query = Restaurant.findOne({_id: req.params.id}).select({ "name": 0, "_id": 0, "cuisine": 0}).sort({'reviews': -1 });

        query.exec((err, revs) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get All Reviews", data: err})
            } else {
                console.log(revs)
                res.json({status: true, message: "Get All Reviews", data: revs})
            }
        });
    }
}