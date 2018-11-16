const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');

module.exports = {
    getAllRestaurants: (req, res) => {
        Restaurant.find({}, (err, restaurants) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get All Restaurants", data: err})
            } else {
                console.log(restaurants)
                res.json({status: true, message: "Get All Restaurants", data: restaurants})
            }
        })
    },
    getRestaurantById: (req, res) => {
        Restaurant.find({_id: req.params.id}, (err, restaurant) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get Restaurant By Id", data: err})
            } else {
                console.log(restaurant)
                res.json({status: true, message: "Get Restaurant By Id", data: restaurant})
            }
        })
    },
    createRestaurant: (req, res) => {
        var restaurant = new Restaurant(req.body);
        restaurant.save((err, restaurant) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Create Restaurant", data: err})
            } else {
                console.log(restaurant)
                res.json({status: true, message: "Create Restaurant", data: restaurant})
            }
        })
    },
    updateRestaurantById: (req, res) => {
        Restaurant.findOne({_id: req.params.id}, (err, restaurantOld) => {
            restaurantOld.name = req.body.name;
            restaurantOld.cuisine = req.body.cuisine;
            restaurantOld.save((err, restaurantNew) => {
                if (err) {
                    console.log(err)
                    res.json({status: false, message: "Update Restaurant", data: err})
                } else {
                    console.log(restaurantNew)
                    res.json({status: true, message: "Update Restaurant", data: restaurantNew})
                }
            })
        })
    },
    nukeRestaurantById: (req, res) => {
        Restaurant.deleteOne({_id: req.params.id}, (err) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Delete Restaurant", data: err})
            } else {
                console.log("Delete")
                res.json({status: true, message: "Delete Restaurant", data: null})
            }
        })
    },
}