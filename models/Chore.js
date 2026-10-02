const mongoose = require("mongoose");

const choreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model("Chore", choreSchema);