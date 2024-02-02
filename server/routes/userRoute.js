const { register, login, userProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();


router.post('/register', register);
router.post('/login', login);
router.get('/me', protectRoute, userProfile);
router.put('/me/edit/:id', protectRoute, updateProfile);
router.delete('/me/delete/:id', protectRoute, deleteProfile);

module.exports = router;