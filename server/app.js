const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
const userRoutes = require('./routes/user')
require('dotenv').config()
require('./config/database').connect()
const { BACKEND_PORT, FRONTEND_URL } = process.env

const app = express() 
app.use(morgan('dev')) 

//server setup
app.listen(BACKEND_PORT, () => {
    console.log("server started on port", BACKEND_PORT);
})

//cors
app.use(cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(express.json())

app.use('/', userRoutes)