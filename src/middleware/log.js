const Log = require("../logger");
const log = (async (err, req, res, next) => {
    await Log("backend", "error", "middleware", err.message);
    res.status(500).send("Something went wrong");
});

module.exports = log;