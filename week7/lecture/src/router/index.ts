import { Application } from "express";
import { userRouter } from "./user";
import { pageRouter } from "./page";

export function connectRouter(app: Application) {
  app.use('/', pageRouter);
  app.use('/api/users', userRouter);
}
