const Keycloak = require('keycloak-connect');
const session = require('express-session');

const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM,
  'auth-server-url': process.env.KEYCLOAK_URL,
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID,
  credentials: {
    secret: process.env.KEYCLOAK_CLIENT_SECRET
  },
  'confidential-port': 0,
  'bearer-only': true
};

const initKeycloak = (app) => {
  const memoryStore = new session.MemoryStore();
  app.use(session({
    secret: process.env.SESSION_SECRET || 'some-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

  const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
  
  return keycloak;
};

module.exports = { initKeycloak };