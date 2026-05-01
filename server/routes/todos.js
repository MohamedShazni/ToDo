const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos', error: err.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }
  try {
    const todo = await Todo.create({ title: title.trim(), description: description?.trim() || '' });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create todo', error: err.message });
  }
});

// Update title/description
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: title?.trim(), description: description?.trim() },
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update todo', error: err.message });
  }
});

// Toggle done status
router.patch('/:id/done', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Failed to toggle done status', error: err.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo', error: err.message });
  }
});

module.exports = router;
