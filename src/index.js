const express = require("express");
const connectDB = require("./config/dbconfig");
const app = express();
const log = require("./middleware/log");
const shortnerRoutes = require("./routes/shortner");
const Log = require("./logger");

app.use(express.json());


app.use("/api/", shortnerRoutes);


app.get("/", log, (req, res) => {
  res.send("for testing purpose");
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
