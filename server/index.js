// importing env variables
require("dotenv").config();

// libraries
import express from"express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";



// microservies routes
import Auth from "./API/Auth";
import  Restaurant  from "./API/Restaurant";
import  Food  from "./API/Food"
import Image  from "./API/Image"
import Order from "./API/order"
import  Reviews from "./API/reviews"
import  User from "./API/user"


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
routeConfig(passport);

// application route
zomato.use ("/auth",Auth);
zomato.use ("/restaurant",Restaurant);
zomato.use ("/food",Food);
zomato.use ("/imges",Image);
zomato.use ("/order",Order);
zomato.use ("/reviews",Reviews);
zomato.use ("/user",User); 

zomato.get ("/", (req,res) => res.json ({message:"Setup sucess"}));
zomato.listen (9000, ()=>
 ConnectDB()
 .then(() => console.log ("Server is running "))
 .catch(() =>console.log ("Server is running but databse connection failed"))

);




