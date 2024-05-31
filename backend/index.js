import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for using JSON in express
app.use(express.json());

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to MERN");
});
//Middle ware for parsing request body
app.use("/books", booksRoute);

//Middleware for handling CORS Policy
//Option 1: ALLOW all origins with default of cors(*)
app.use(corse());
// Option 2: Allow custom origins
// app.use(
//     corse({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App Connected to Database");
        app.listen(PORT, ()=>{
            console.log(`App is listening to port : ${PORT}`);
        });
        
    })
    .catch((error)=>{
        console.log(error);
    })