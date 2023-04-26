const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

//server setup
app.listen(4000, () => {
    console.log("server started on port 4000");
})

//database connection
mongoose
    .connect("mongodb+srv://finddoc:44iYe9xqNYQtayLd@finddocdb.avgepwd.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connected!');
    })
    .catch((err) => {
        console.log('errorrr', err.message);
    })

//cors
app.use(cors({
    origin: ["http://127.0.0.1:5173/"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(express.json())


app.get('/', (req, res) => {
    res.json({ "status": "working" })
})