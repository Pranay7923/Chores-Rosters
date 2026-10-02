const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    week: {
        type: Number,
        required: true
    },
    flatmate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flatmate",
        required: true
    },
    chore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chore",
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    onLeave: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Assignment", assignmentSchema);