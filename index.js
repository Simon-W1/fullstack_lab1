const express = require("express")
const app = express()
const mongoose = require("mongoose")
const signale = require("signale")
const users = require("./routes/users")
const PORT = process.env.PORT || 3000

require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    signale.success("Connected to database")
})

app.use(express.json())
app.use(express.static("public"))

app.use("/api/users", users)

app.listen(PORT, () => {
    console.log("Server has started!")
})