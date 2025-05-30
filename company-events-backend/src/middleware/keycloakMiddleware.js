const { initKeycloak } = require('../config/keycloak');
const express = require('express');

// This is a helper function to get the initialized keycloak instance
const getKeycloak = (() => {
  let keycloak;
  
  return (app = express()) => {
    if (!keycloak) {
      keycloak = initKeycloak(app);
    }
    return keycloak;
  };
})();

// Middleware to protect routes
const protect = () => getKeycloak().protect();

// Middleware to check for specific roles
const hasRole = (roles) => getKeycloak().protect((token) => {
  return Array.isArray(roles) 
    ? roles.some(role => token.hasRole(role))
    : token.hasRole(roles);
});

module.exports = {
  getKeycloak,
  protect,
  hasRole
};