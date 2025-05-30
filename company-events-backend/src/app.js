const express = require('express');
const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware').default;
const { initKeycloak } = require('./config/keycloak');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Keycloak
const keycloak = initKeycloak(app);
app.use(keycloak.middleware());

// Routes
app.use('/api', routes);

// Error middleware
app.use(errorMiddleware);

module.exports = app;