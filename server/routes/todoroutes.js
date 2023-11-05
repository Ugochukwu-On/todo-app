const express = require('express')
const router = express.Router()
const  todoController = require('../controller/todoController')

// TODO ROUTES
router.post('/create-todo', todoController.createTodo); 
router.get('/get-todo/:userId', todoController.getTodos); 
router.put('/update-todo/:userId', todoController.updateTodo);
router.delete('/delete-todo/:userId', todoController.deleteTodo);


module.exports = router;