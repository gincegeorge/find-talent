const express = require('express')
const { bizSignup, bizLogin } = require('../controllers/bizController')
const router = express.Router()

router.post("/signup", bizSignup)
router.post("/login", bizLogin)

module.exports = router