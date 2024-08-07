const express = require('express');
const router = express.Router();
const { ChatRoom } = require('../models/ChatRoom');

// Get all chat rooms
router.get('/', async (req, res) => {
  try {
    const chatrooms = await ChatRoom.findAll();
    res.json(chatrooms);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single chat room by id
router.get('/:id', async (req, res) => {
  try {
    const chatroom = await ChatRoom.findByPk(req.params.id);
    if (chatroom) {
      res.json(chatroom);
    } else {
      res.status(404).send('Chat room not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new chat room
router.post('/', async (req, res) => {
  try {
    const chatroom = await ChatRoom.create({ name: req.body.name });
    res.status(201).json(chatroom);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a chat room
router.put('/:id', async (req, res) => {
  try {
    const chatroom = await ChatRoom.findByPk(req.params.id);
    if (chatroom) {
      chatroom.name = req.body.name;
      await chatroom.save();
      res.json(chatroom);
    } else {
      res.status(404).send('Chat room not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a chat room
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ChatRoom.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send("Chat room deleted");
    } else {
      res.status(404).send("Chat room not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
