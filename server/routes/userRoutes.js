const express = require('express')
const { signUp, login, verifyUser } = require('../controllers/userController')
const { adminDebug } = require('../utils/debug')
const router = express.Router()

router.post('/verify', verifyUser)

router.post('/signup', signUp)
router.post('/login', login)
router.get('/',)



module.exports = router