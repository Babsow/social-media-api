import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from './Routes/AuthRoute.js'


//Routes 


//Middlewares
const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

mongoose.connect("mongodb://localhost/socialMedia")
.then(()=> app.listen(5000, ()=>console.log("Listening")))
.catch((error)=> console.log(error));

// Routes usage
app.use('/auth', AuthRoute)