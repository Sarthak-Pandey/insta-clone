const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Follower is required"]
    },
    follow:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Follow is required"]
    }
},{
    timestamps: true
})

const followModel = mongoose.model("follows",followSchema);


module.exports = followModel;

