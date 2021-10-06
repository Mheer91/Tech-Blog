const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.status(400).json({ message: 'You must be logged in to do that!' })
    } else {
      next();
    }
  };
  
  module.exports = withAuth;