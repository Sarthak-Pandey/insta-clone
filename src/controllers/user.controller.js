const followModel = require("../models/follow.model");


async function followUserController(req,res){

    const followerUsername = req.user.user;
    const followUsername = req.params.username;

    if(followerUsername===followUsername){
        return res.status(400).json({
            message:"You does not follow yourself"
        })
    }


    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        follow:followUsername
    });

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You are already ${followUsername}`,
            follow:isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        follow:followUsername
    })

    res.status(201).json({
        message:`You are following ${followUsername}`,
        follow:followRecord
    })

}


module.exports = {
    followUserController
}