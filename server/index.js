// importing env variables
require("dotenv").config();

// libraries
import express from"express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config";

// microservies routes
import Auth from "./API/Auth";

// databse connection
import ConnectDB from"./database/connection";


const zomato =express();

// application routes
zomato.use(express.json());
zomato.use(express.urlencoded({ extended :false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport config
googleAuthConfig(passport);

// application route
zomato.use ("/auth",Auth);


zomato.get ("/", (req,res) => res.json ({message:"Setup sucess"}));
zomato.listen (9000, ()=>
 ConnectDB()
 .then(() => console.log ("Server is running "))
 .catch(() =>console.log ("Server is running but databse connection failed"))

);




