const mongoose = require("mongoose");

const flatmateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    completedChores: {
        type: Number,
        default: 0
    },
    workload: {
        type: Number,
        default: 0
    },
    lastChore: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Flatmate", flatmateSchema);