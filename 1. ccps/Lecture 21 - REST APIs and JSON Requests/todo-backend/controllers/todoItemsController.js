const TodoItem = require("../models/todoItem");

exports.createTodoItem = async (req, res) => {
  try {
    console.log(req.body);
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date });
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (error) {
    console.log(error);
  }
};
