import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js'
import orgRoutes from './routes/organization.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';

import bodyParser from 'body-parser'
dotenv.config();

const app = express();

//connect to DB

const PORT = process.env.PORT || 5000

//middlewares
app.use(express.json())
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/api/auth',authRoutes)
app.use('/api/organizations',orgRoutes)
app.use('/api/users',userRoutes)


app.get('/', (req,res) => {
    res.send("Server ready on port")
})
app.listen(PORT, () => {
    connectDB()

    console.log(`Server on port ${PORT}`)})