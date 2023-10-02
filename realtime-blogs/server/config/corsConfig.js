const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

module.exports = cors(corsOptions);