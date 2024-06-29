require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser");
const connectedDB = require('./db/connectionDB')
const cors = require('cors')
const app = express()
const auth = require('./routers/authRouter')
const course = require('./routers/courseRouter')
const company = require('./routers/companyRouter')
const protectRoute = require('./middlewares/protectRoute');
const trainer = require('./routers/trainerRouter')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

app.use("/api/auth" , auth)
app.use('/api/admin',protectRoute.protectRoute , course)
app.use('/api/admin',protectRoute.protectRoute , company)
app.use('/api/trainer', protectRoute.protectRoute , trainer)


app.listen(process.env.PORT || 5000 , () => {
    connectedDB()
    console.log(`listening on ${process.env.PORT}`);
})
