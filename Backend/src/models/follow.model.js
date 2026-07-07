
const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower:{
        type:String
    },
    follow:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},{
    timestamps: true
})


followSchema.index({follower:1, follow:1},{unique:true});

const followModel = mongoose.model("follows",followSchema);


module.exports = followModel;   

