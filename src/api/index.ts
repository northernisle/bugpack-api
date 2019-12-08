import user from "./routes/user";
import { Router } from "express";

export default (app: Router) => {
  app.use(user);
}