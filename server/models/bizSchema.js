const mongoose = require("mongoose");

const bizSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
});

module.exports = mongoose.model("bizUser", bizSchema); 