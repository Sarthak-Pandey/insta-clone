const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req,res){

    const followerUsername = req.user.user;
    const followUsername = req.params.username;


    if(followerUsername===followUsername){
        return res.status(400).json({
            message:"You does not follow yourself"
        })
    }

    const isFollowExists = await userModel.findOne({
        username:followUsername
    })

    if(!isFollowExists){
        return res.status(404).json({
            message:"User are trying to follow does not exists"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        follow:followUsername
    });

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You are already follow ${followUsername}`,
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


async function unfollowUserController(req,res){
    const followerUsername = req.user.user;
    const followUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        follow:followUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(400).json({
        message:`You have unfollow ${followUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}