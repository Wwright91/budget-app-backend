const express = require("express");
const cors = require("cors")
const budgetControllers = require("./controllers/budgetControllers")

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Budget App!");
  });

app.use("/entries", budgetControllers);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;