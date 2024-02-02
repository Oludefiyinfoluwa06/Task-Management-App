const Task = require("../models/task")

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort({ updatedAt: -1 });

    if (!tasks) {
        return res.status(400).json({ 'error': 'You do not have any tasks' });
    }

    return res.status(200).json({ 'tasks': tasks });
}

const getTaskDetails = async (req, res) => {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({ 'error': 'Task could not be found' });
    }

    return res.status(200).json({ 'task': task });
}

const addTask = async (req, res) => {
    const { name, description, dueDate, priorityLevel } = req.body;

    if (!name || !description || !dueDate || !priorityLevel) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    const validPriorityLevels = ['low', 'medium', 'high'];

    if (!validPriorityLevels.includes(priorityLevel.toLowerCase())) {
        return res.status(400).json({ error: 'Priority level must be either low, medium, or high.' });
    }

    const task = await Task.create({ user: req.user.id, name, description, dueDate, priorityLevel });

    if (!task) {
        return res.status(500).json({ 'error': 'An error occurred, please try again later' });
    }

    return res.status(200).json({ 'message': 'Task added successfully', task });
}

const updateTask = async (req, res) => {
    const id = req.params.id;

    const { name, description, dueDate, priorityLevel } = req.body;

    if (!name || !description || !dueDate || !priorityLevel) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    const task = await Task.findByIdAndUpdate(id, { name, description, dueDate, priorityLevel }, { new: true });

    if (!task) {
        return res.status(400).json({ 'error': 'An error occurred, try again later' });
    }

    return res.status(200).json({ 'message': 'Task updated successfully' });
}

const deleteTask = async (req, res) => {
    const id = req.params.id;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        return res.status(400).json({ 'error': 'An error occurred, try again later' });
    }

    return res.status(200).json({ 'message': 'Task deleted successfully' });
}

module.exports = {
    getTasks,
    getTaskDetails,
    addTask,
    updateTask,
    deleteTask
}