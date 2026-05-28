const express = require('express');
const { signup } = require('../controllers/auth.controller');  // ✅ "signup"

const router = express.Router();

router.post("/signup", signup);  // ✅ "signup"

module.exports = router;