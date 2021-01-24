const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/post");

router.post("/", postsCtrl.createPosts);

router.get("/:id", postsCtrl.getOnePost);


module.exports = router;