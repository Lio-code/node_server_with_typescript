import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import todoRoutes from './routes/todos';

const app = express();

app.use(json());

//server will use todos routes at url "/todos"
app.use('/todos', todoRoutes);

//Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

//Server listen on port 3000
app.listen(3000);
