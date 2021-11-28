// ********************* for dotenv
            require('dotenv').config()

const { urlencoded } = require('express');
const express = require("express");
const cookieparser = require("cookie-parser")
const app = express();

const Port = process.env.PORT || 2021;

//   for router wala page 
        const router = require("../Routes/routes")
// *****************connection to db ***************************
                require("./db/conn")

// ********************* for using view engine******************************
                    const path = require("path");
                    app.set("view engine","hbs")
                    // console.log(path.join(__dirname +"/../Templates/views"));
                    const viewpath = path.join(__dirname +"/../Templates/views")
                    app.set("views",viewpath)

// **************** for partials
const hbs = require("hbs")
const Partialpath = path.join(__dirname +"/../Templates/Partials")
hbs.registerPartials(Partialpath);

// ****************************** for reading form data 
app.use(express.json());
app.use(urlencoded({extended:false}));











app.use(cookieparser());

// ************************ Router ***********************************
            //  for using router 
            app.use(router);
// ***************

app.listen(Port,() =>{
    console.log(`Application listened at port Number ${Port}`);
})