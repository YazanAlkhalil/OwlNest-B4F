const express = require('express')
const cookieParser = require("cookie-parser");
require('dotenv').config()
const connectedDB = require('./db/connectionDB')
// const cors = require('cors')
const app = express()
const auth = require('./routers/authRouter')
const admin = require('./routers/courseRouter')
const company = require('./routers/companyRouter')
const protectRoute = require('./middlewares/protectRoute');


app.use(express.json())
app.use(cookieParser())
// app.use(cors())

app.use("/api/auth" , auth)
app.use('/api/admin',protectRoute.protectRoute , admin)
app.use('/api/admin',protectRoute.protectRoute , company)



app.listen(process.env.PORT || 5000 , () => {
    connectedDB()
    console.log(`listening on ${process.env.PORT}`);
})
