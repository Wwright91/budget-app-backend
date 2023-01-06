const express = require("express");
const budgetEntries = express.Router();
const budgetArray = require("../models/db");
const {
  validateURL,
  validateDataType,
  checkExists,
} = require("../models/validation");

// res.send("Please Check Given Index Or Go Back To The <a href="/">Homepage</a>")

budgetEntries.get("/", (req, res) => {
  res.json(budgetArray);
});

budgetEntries.get("/:index", (req, res) => {
  if (budgetArray[req.params.index]) {
    res.json(budgetArray[req.params.index]);
  } else {
    res.redirect("/");
    //   res.status(404).json({error: "Please Check Given Index"})
  }
});

budgetEntries.post("/", validateDataType, validateURL, (req, res) => {
  budgetArray.push(req.body);
  res.json(budgetArray[budgetArray.length - 1]);
});

budgetEntries.delete("/:index", checkExists, (req, res) => {
  const deletedLog = budgetArray.splice(req.params.index, 1);
  res.status(200).json(deletedLog);
});

budgetEntries.put("/:index", validateURL, checkExists, async (req, res) => {
  budgetArray[req.params.index] = req.body;
  res.status(200).json(budgetArray[req.params.index]);
});

module.exports = budgetEntries;
