async function getUserProfile(req, res) {
    try {
      // The user info comes from the Keycloak token
      const userInfo = {
        id: req.kauth.grant.access_token.content.sub,
        username: req.kauth.grant.access_token.content.preferred_username,
        email: req.kauth.grant.access_token.content.email,
        roles: req.kauth.grant.access_token.content.realm_access.roles,
      };
      
      res.json({ user: userInfo });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
  }

module.exports = { getUserProfile };