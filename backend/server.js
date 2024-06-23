const express = require('express')
const cookieParser = require("cookie-parser");
require('dotenv').config()
const connectedDB = require('./db/connectionDB')
// const cors = require('cors')
const app = express()
const signUp = require('./routers/authRouter')

app.use(express.json())
app.use(cookieParser())
// app.use(cors())
app.use("/api/auth" , signUp)


app.listen(process.env.PORT || 5000 , () => {
    connectedDB()
    console.log(`listening on ${process.env.PORT}`);
})
