import { RequestHandler } from 'express';
//Interface RequestHandler from express expects 3 parameters: Request, Response, NextFunction

import { Todo } from '../models/todos';

let TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'new todo created', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res
    .status(200)
    .json({ message: 'access to todo list granted', todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((el) => el.id === todoId);

  if (todoIndex < 0) {
    throw new Error('todo does not exist');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'todo updated', updatedTodo: TODOS[todoIndex] });
};
