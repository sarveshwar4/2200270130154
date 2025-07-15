const axios = require('axios');
require('dotenv').config();
const access_token = process.env.ACCESS_TOKEN;

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );
    console.log('Log sent successfully:', response);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}

module.exports = Log;