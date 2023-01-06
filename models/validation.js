const budgetArray = require("./db");

const validateURL = (req, res, next) => {
  if (req.secure || req.protocol) {
    return next();
  } else {
    res.status(400).send({ Error: "Check your URL and try again!" });
  }
};

const validateDataType = (req, res, next) => {
  const entry = req.body;

  if (!entry.date || typeof entry.date !== "string") {
    res.status(400).send({ error: "Requires a valid date as a string." });
  } else if (!entry.name || typeof entry.name !== "string") {
    res.status(400).send({ error: "Requires a valid name as a string." });
  } else if (!entry.amount || typeof parseInt(entry.amount) !== "number") {
    res.status(400).send({ error: "Requires a valid amount as a number." });
  } else if (!entry.from || typeof entry.from !== "string") {
    res.status(400).send({ error: "Requires a valid from as a string." });
  } else if (!entry.category || typeof entry.category !== "string") {
    res.status(400).send({ error: "Requires a valid category as a string." });
  } else {
    return next();
  }
};

const checkExists = (req, res, next) => {
  if (budgetArray[req.params.index]) {
    next();
  } else {
    res.status(404).json({ error: "Element at given index not found." });
  }
};

module.exports = { validateURL, validateDataType, checkExists };
