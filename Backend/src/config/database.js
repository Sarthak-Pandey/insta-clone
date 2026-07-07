const mongoose = require("mongoose");

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Conneted To DB");
}


module.exports = connectToDb

