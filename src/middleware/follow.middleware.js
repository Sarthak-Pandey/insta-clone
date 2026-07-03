const followModel = require("../models/follow.model");

async function findFollowRequest(req,res,next){
    const loggedInUser = req.user.user;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower: loggedInUser,
        follow: followerUsername
    });

    if (!followRequest) {
        return res.status(404).json({
             message: "Follow request not found"
        });
    }

    req.followRequest = followRequest;

    next();
}

module.exports = findFollowRequest;