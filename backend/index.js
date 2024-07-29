import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//Middleware for using JSON in express
app.use(express.json());

// const corsOptions ={
//     origin:'https://5173-yuvraj08-bookstoremern-c4enzoxqdc3.ws-us115.gitpod.io', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

//Middleware for handling CORS Policy
//Option 1: ALLOW all origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'https://bookstore-mern-eight.vercel.app',
//         methods: ['GET','POST','PUT','DELETE'],
//         credentials: true
//     })
// );
// Add CORS headers
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://bookstore-mern-eight.vercel.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://5173-yuvraj08-bookstoremern-sjc3k4uq8kx.ws-us114.gitpod.io/'); // Replace with your frontend's domain
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to MERN");
});



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
