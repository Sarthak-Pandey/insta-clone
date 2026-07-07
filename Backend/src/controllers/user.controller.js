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
        if(isAlreadyFollowing.status==='pending'){
            return res.status(409).json({
                message:"Follow request Already sent"
            })
        }
        if(isAlreadyFollowing.status==='accepted'){
            return res.status(409).json({
                message:"Already following this user"
            })
        }
        if(isAlreadyFollowing.status==='rejected'){
            return res.status(409).json({
                message:"Follow Request Sent again"
            })
        }
    }

    const follow = await followModel.create({
        follower:followerUsername,
        follow:followUsername,
        status:isFollowExists.isPrivate?"pending":"accepted"
    })

    return res.status(201).json({
        message:isFollowExists.isPrivate?"Follow request sent":"User followed Successfully",
        follow
    })

}

async function getPendingRequestsController(req,res){
    const username = req.user.user;

    const pendingRequests = await followModel.find({
        follow:username,
        status:"pending"
    })

    return res.status(200).json({
        message:"Pending follow requests fetched Successfully",
        pendingRequests
    })

}

async function acceptFollowRequestController(req,res){

    if(req.followRequest.status==="accepted"){
        return res.status(409).json({
            message:"Request already accpted"
        })
    }

    req.followRequest.status = "accepted";

    await req.followRequest.save();

    return res.status(200).json({
        message:"Follow request accepted Successfully",
        followRequest: req.followRequest
    })
}

async function rejectFollowRequestController(req,res){
    if(req.followRequest.status==="rejected"){
        return res.status(409).json({
            message:"Request already rejected"
        })
    }

    req.followRequest.status = "rejected";

    await req.followRequest.save();

    return res.status(200).json({
        message:"Follow request rejected successfully",
        followRequest: req.followRequest
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
    getPendingRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    unfollowUserController
}

