const express = require("express");
const Flatmate = require("../models/Flatmate");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await Flatmate.find());
});

router.post("/", async (req, res) => {
    res.status(201).json(await Flatmate.create(req.body));
});

router.delete("/:id", async (req, res) => {
    const flatmate = await Flatmate.findByIdAndDelete(req.params.id);
    if (!flatmate) return res.status(404).json({ message: "Flatmate not found" });
    res.json(flatmate);
});

module.exports = router;