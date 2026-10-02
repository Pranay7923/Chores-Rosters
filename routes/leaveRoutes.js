const express = require("express");
const router = express.Router();

const Assignment = require("../models/Assignment");

// Mark an assignment as on leave
router.put("/:id", async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            { onLeave: true },
            { new: true }
        );

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.json({
            message: "Leave applied successfully",
            assignment: assignment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;