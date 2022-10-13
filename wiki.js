const express = require('express');
const router = express.Router();

// Route vers la page d'accueil
router.get('/', (req, res) => {
  res.send("Page d'accueil du wiki");
});


// Route vers la page à propos
router.get('/about', (req, res) => {
  res.send('À propos de ce wiki');
});

module.exports = router;
