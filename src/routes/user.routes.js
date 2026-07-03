const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middleware/auth.middleware");
const findFollowRequest = require("../middleware/follow.middleware");
const userRouter = express.Router();

userRouter.post('/follow/:username',identifyUser,userController.followUserController);

userRouter.get('/follow-requests',identifyUser,userController.getPendingRequestsController);

userRouter.patch("/follow/:username/accepted",identifyUser,findFollowRequest,userController.acceptFollowRequestController);

userRouter.patch("/follow/:username/reject",identifyUser,findFollowRequest,userController.rejectFollowRequestController);

userRouter.post('/unfollow/:username',identifyUser,userController.unfollowUserController);

module.exports = userRouter;

