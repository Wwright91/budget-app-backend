const budgetArray = require("./db");

const validateURL = (req, res, next) => {
  if (req.secure || req.protocol) {
    return next();
  } else {
    res.status(400).send(`Check your URL and try again!`);
  }
};

const validateDataType = (req, res, next) => {
  if (
    typeof req.body.date === "string" &&
    typeof req.body.name === "string" &&
    typeof req.body.amount === "number" &&
      typeof req.body.from === "string"
      && typeof req.body.category === "string"
    // && typeof req.body.daysSinceLastCrisis === "number"
  ) {
    return next();
  } else {
    res.status(404).send("Invalid data type");
  }
};

const checkExists = (req, res, next) => {
  if (budgetArray[req.params.indexArray]) {
    next();
  } else {
    res.status(404).json({ error: "Element at given index not found." });
  }
};

module.exports = { validateURL, validateDataType, checkExists };