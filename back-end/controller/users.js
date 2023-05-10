const cloudinary = require("../utils/cloudinary")
const { getAll, getOne, addOne, updateOne, deleteOne } = require('../database/modules/users');

module.exports = {
    getAllIndividuals: function (req, res) {
        getAll(function (err, results) {
            if (err) console.log(err);
            else res.json(results);
        });
    },

    getIndividualById: function (req, res) {
        const id = req.params.id;
        getOne(id, function (err, result) {
            if (err) console.log(err);
            else res.json(result);
        });
    },

    addIndividual: function (req, res) {
        const data = req.body;
        const file = req.file;

        cloudinary.uploader.upload(file.path, function (err, result) {
            if (err) console.log(err);
            else {
                data.profile_pic = result.secure_url;
                addOne(data, function (err, result) {
                    if (err) console.log(err);
                    else res.json(result);
                });
            }
        });
    },

    updateIndividual: function (req, res) {
        const id = req.params.id;
        const data = req.body;
        const file = req.file;

        if (file) {
            cloudinary.uploader.upload(file.path, function (err, result) {
                if (err) console.log(err);
                else {
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

    deleteIndividual: function (req, res) {
        const id = req.params.id;
        getOne(id, function (err, result) {
            if (err) console.log(err);
            else {
                const profilePicUrl = result.profile_pic;
                const publicId = profilePicUrl.split('/').pop().split('.')[0];
                cloudinary.uploader.destroy(publicId, function (err, result) {
                    if (err) console.log(err);
                    else {
                        deleteOne(id, function (err, result) {
                            if (err) console.log(err);
                            else res.json(result);
                        });
                    }
                });
            }
        });
    },
};