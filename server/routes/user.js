const express = require('express')
const { signUp, login } = require('../controllers/userController')
const { adminDebug } = require('../utils/debug')
const router = express.Router()

router.get('/', (req, res) => {
    adminDebug("foooooooooooooooooooooooooooooooooooooooooooooooo")
    res.send("Nothing fancy here.")
})

router.post('/signup', signUp)
router.post('/login', login)



module.exports = router