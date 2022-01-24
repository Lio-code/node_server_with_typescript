"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
//Interface RequestHandler from express expects 3 parameters: Request, Response, NextFunction
const todos_1 = require("../models/todos");
let TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'new todo created', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res
        .status(200)
        .json({ message: 'access to todo list granted', todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((el) => el.id === todoId);
    if (todoIndex < 0) {
        throw new Error('todo does not exist');
    }
    TODOS[todoIndex] = new todos_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'todo updated', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
