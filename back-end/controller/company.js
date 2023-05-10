
const cloudinary = require("../utils/cloudinary")
const { getAll, getOne, addOne, updateOne, deleteOne } = require("../database/modules/company");
module.exports = {
    getAllCompanies: function (req, res) {
        getAll(function (err, results) {
            if (err) console.log(err);
            else res.json(results);
        });
    },

    getCompanyById: function (req, res) {
        const id = req.params.id;
        getOne(id, function (err, result) {
            if (err) console.log(err);
            else res.json(result);
        });
    },

    addCompany: function (req, res) {
        const data = req.body;
        // Upload profile_pic to Cloudinary
        cloudinary.uploader.upload(data.profile_pic, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send("Failed to upload image to Cloudinary");
            } else {
                // Replace profile_pic URL with Cloudinary URL
                data.profile_pic = result.secure_url;

                addOne(data, function (err, result) {
                    if (err) console.log(err);
                    else res.json(result);
                });
            }
        });
    },

    updateCompany: function (req, res) {
        const id = req.params.id;
        const data = req.body;
        // Check if profile_pic is being updated
        if (data.profile_pic) {
            // Upload new profile_pic to Cloudinary
            cloudinary.uploader.upload(data.profile_pic, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Failed to upload image to Cloudinary");
                } else {
                    // Replace profile_pic URL with Cloudinary URL
                    data.profile_pic = result.secure_url;

                    updateOne(id, data, function (err, result) {
                        if (err) console.log(err);
                        else res.json(result);
                    });
                }
            });
        } else {
            updateOne(id, data, function (err, result) {
                if (err) console.log(err);
                else res.json(result);
            });
        }
    },

    deleteCompany: function (req, res) {
        const id = req.params.id;
        deleteOne(id, function (err, result) {
            if (err) console.log(err);
            else res.json(result);
        });
    }
};