const express = require("express");
const Chore = require("../models/Chore");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await Chore.find());
});

router.post("/", async (req, res) => {
    res.status(201).json(await Chore.create(req.body));
});

router.delete("/:id", async (req, res) => {
    const chore = await Chore.findByIdAndDelete(req.params.id);
    if (!chore) return res.status(404).json({ message: "Chore not found" });
    res.json(chore);
});

module.exports = router;