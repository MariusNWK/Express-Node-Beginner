const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'À propos des poules', message: 'Elles sont où ?' });
});

module.exports = router;
