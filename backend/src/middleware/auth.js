module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
    // Logic to verify the token goes here
    // If valid, call next(); otherwise, return an error response
    next();
  }
};