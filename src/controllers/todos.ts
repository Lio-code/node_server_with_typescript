import { RequestHandler } from 'express';
//Interface RequestHandler from express expects 3 parameters: Request, Response, NextFunction

import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

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
