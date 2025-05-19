const express = require('express');
const router = express.Router();
const { getDSSRanking } = require('../controllers/dssController');

router.get('/ranking', getDSSRanking); // GET /api/dss/ranking?semester=2&className=XI IPA 2

module.exports = router;
