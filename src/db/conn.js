const mongoose = require("mongoose")
mongoose.connect(process.env.Database)
.then(console.log("connection succesfull"))
.catch((err) =>{
    console.log(err);
})