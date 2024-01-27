const Task = require("../models/task")

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });

    if (!tasks) {
        return res.status(400).json({ 'error': 'You do not have any tasks' });
    }

    return res.status(200).json({ 'tasks': tasks });
}

const addTask = async (req, res) => {
    const { name, description, dueDate, priorityLevel, progress } = req.body;

    if (!name || !description || !dueDate || !priorityLevel || !progress) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    const task = await Task.create({ user: req.user.id, name, description, dueDate, priorityLevel, progress });

    if (!task) {
        return res.status(500).json({ 'error': 'An error occurred, please try again later' });
    }

    return res.status(200).json({ 'message': 'Task added successfully', task });
}

const updateTask = async (req, res) => {
    const id = req.params.id;

    const { name, description, dueDate, priorityLevel, progress } = req.body;

    if (!name || !description || !dueDate || !priorityLevel || !progress) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    const task = await Task.findByIdAndUpdate(id, { name, description, dueDate, priorityLevel, progress }, { new: true });

    if (!task) {
        return res.status(404).json({ 'error': 'This task could not be found' });
    }

    return res.status(200).json({ 'message': 'Task updated successfully' });
}

const deleteTask = async (req, res) => {
    const id = req.params.id;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        return res.status(404).json({ 'error': 'This task could not be found' });
    }

    return res.status(200).json({ 'message': 'Task deleted successfully' });
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}