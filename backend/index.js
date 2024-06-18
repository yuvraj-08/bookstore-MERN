import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//Middleware for using JSON in express
app.use(express.json());

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to MERN");
});


//Middleware for handling CORS Policy
//Option 1: ALLOW all origins with default of cors(*)
// app.use(cors());
// Option 2: Allow custom origins
app.use(
    cors({
        origin: 'bookstore-mern-eight.vercel.app/',
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true
    })
);
//Middle ware for parsing request body
app.use("/books", booksRoute);


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