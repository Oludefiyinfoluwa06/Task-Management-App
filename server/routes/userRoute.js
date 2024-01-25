const { register, login, userProfile } = require('../controllers/userController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();


router.post('/register', register);
router.post('/login', login);
router.get('/me', protectRoute, userProfile);

module.exports = router;