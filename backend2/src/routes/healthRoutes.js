// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     message: "Server is healthy",
//     timestamp: new Date().toISOString(),
//   });
// });

// module.exports = router;


// health.js
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose to access connection status

router.get("/", (req, res) => {
  let mongoStatus;
  switch (mongoose.connection.readyState) {
    case 0:
      mongoStatus = "Disconnected";
      break;
    case 1:
      mongoStatus = "Connected";
      break;
    case 2:
      mongoStatus = "Connecting";
      break;
    case 3:
      mongoStatus = "Disconnecting";
      break;
    default:
      mongoStatus = "Unknown";
  }

  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    database: {
      type: "MongoDB",
      status: mongoStatus,
    },
  });
});

module.exports = router;