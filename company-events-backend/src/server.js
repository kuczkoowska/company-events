const express = require('express');
const app = require('./app');
const http = require('http');
const { PORT, DB_URI } = process.env;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
