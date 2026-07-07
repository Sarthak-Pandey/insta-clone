const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({storgae:multer.memoryStorage()});
const identifyUser = require("../middleware/auth.middleware");

// Post /api/post [protected]
// req.body = {caption,img-url}

postRouter.post('/',upload.single("image"),identifyUser,postController.createPostController);

// GET /api/posts/ [protected]

postRouter.get('/',identifyUser,postController.getPostController);

// GET /api/posts/details/:postid
// - return details about the specific post with the id also check wheather the post belong to the user that is requesting come from 

postRouter.get('/details/:postId',identifyUser,postController.getPostDetailsController);

// Post /api/posts/like/:postid

postRouter.post('/likes/:postId',identifyUser,postController.likePostController);


postRouter.get('/feed',identifyUser,postController.getFeedController);


module.exports = postRouter;

