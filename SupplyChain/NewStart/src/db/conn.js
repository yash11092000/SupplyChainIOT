require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_PATH).then(() => {
    console.log("Connection successfull")
}).catch((e) => {
    console.log("Connection unsuccessfull");
})