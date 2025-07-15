const express = require("express");
const connectDB = require("./config/dbconfig");
const app = express();
const shortnerRoutes = require("./routes/shortner");
const Log = require("./logger");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("for testing purpose");
});

app.use("/api/", shortnerRoutes);

app.use(async (err, req, res, next) => {
  await Log("backend", "error", "middleware", err.message);
  res.status(500).send("Something went wrong");
});


connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

module.exports = app;
