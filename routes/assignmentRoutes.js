const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await Assignment.find().populate("flatmate chore"));
});

router.post("/", async (req, res) => {
    res.status(201).json(await Assignment.create(req.body));
});

router.put("/:id", async (req, res) => {
    const assignment = await Assignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json(assignment);
});

router.delete("/:id", async (req, res) => {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json(assignment);
});

module.exports = router;