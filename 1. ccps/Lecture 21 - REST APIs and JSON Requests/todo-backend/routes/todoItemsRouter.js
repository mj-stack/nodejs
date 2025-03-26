const express = require("express");
const todoItemsRouter = express.Router();

const todoItemsController = require("../controllers/todoItemsController.js");

todoItemsRouter.post("/", todoItemsController.createTodoItem);

module.exports = todoItemsRouter;
