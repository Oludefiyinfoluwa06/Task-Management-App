const { uploadPic } = require("../controllers/profilePicUploadController");
const { protectRoute } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/profilePicUploadMiddleware");

const router = require("express").Router();

router.post('/upload', protectRoute, upload.single('profile'), uploadPic);

module.exports = router;
