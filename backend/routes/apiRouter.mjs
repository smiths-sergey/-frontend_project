import { Router } from "express";
import { ApiController } from "../controllers/apiController.mjs";
import authMiddleware from "./authMiddleware.mjs";

export const apiRouterProtected = Router();
apiRouterProtected.use(authMiddleware);

apiRouterProtected.get("/todos", ApiController.todoList);
apiRouterProtected.post("/todos", ApiController.todoCreate);
apiRouterProtected.patch("/todos/", ApiController.todoUpdate);
apiRouterProtected.delete("/todos/:id", ApiController.todoDelete);

apiRouterProtected.get("/user", ApiController.user);

export const apiRouter = Router();
apiRouter.post("/register", ApiController.register);
apiRouter.post("/auth", ApiController.auth);
