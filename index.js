"use strict";

require('babel-register');
require('dotenv').config();

const app = require('./server/server').app, PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log("application listening on port:", PORT);
})
