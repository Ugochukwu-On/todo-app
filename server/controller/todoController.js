const Todo = require('../models/Todo'); 

// Function to create a new todo based on the request body
const createTodo = async (req, res) => {
  try {
    const todoFromRequest = req.body;
    console.log(todoFromRequest)
    const newTodo = new Todo();

    newTodo.userId = todoFromRequest.userId;
    newTodo.title = todoFromRequest.title;
    newTodo.description = todoFromRequest.description;
    newTodo.progress = todoFromRequest.progress || 50;
    newTodo.status = todoFromRequest.status || 'pending';

    const createdTodo = await newTodo.save();
    console.log('Todo created successfully:', createdTodo);
    res.status(201).json(createdTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

//get a todo

const getTodos = async (req, res) => {
  const userId = req.params.userId
  console.log(userId)
    try {
      // Query the database to retrieve all todo items
      const todos = await Todo.find({userId});
  
      // Send the retrieved todos as a JSON response
      res.json(todos);
    } catch (error) {
      console.error('Error retrieving todos:', error);
      res.status(500).json({ error: 'Failed to retrieve todos' });
    }
  };

//update todo
const updateTodo = async (req, res) => {
  try {
    const userId = req.params.userId; // Updated the variable name

    // Extract the updated todo data from the request body
    const updatedTodoData = req.body;

    // Use the ID to find the todo in the database and update it
    const updatedTodo = await Todo.findOneAndUpdate({ userId }, updatedTodoData, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log('Todo updated successfully:', updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};


//delete todo
const deleteTodo = async (req, res) => {
  try {
    // Extract the userId from the request parameters
    const userId = req.params.userId;

    // Use the userId to find and delete the todo in the database
    const deletedTodo = await Todo.findOneAndDelete({ userId });

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log('Todo deleted successfully:', deletedTodo);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

  
  
module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo
}

