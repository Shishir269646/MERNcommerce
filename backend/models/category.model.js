const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        image: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Category', categorySchema);