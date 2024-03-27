const router = require('express').Router();
const { AIUnsplashAPIKey } = require('../../config');

router.post('/key', (req, res) => {
  res.json({ AIUnsplashAPIKey });
});

module.exports = router;
