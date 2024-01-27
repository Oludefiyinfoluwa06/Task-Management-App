const { getTasks, addTask, updateTask, deleteTask, getTaskDetails } = require('../controllers/taskController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/all', protectRoute, getTasks);

router.get('/:id', protectRoute, getTaskDetails);

router.post('/add', protectRoute, addTask);

router.put('/update/:id', protectRoute, updateTask);

router.delete('/delete/:id', protectRoute, deleteTask);

module.exports = router;