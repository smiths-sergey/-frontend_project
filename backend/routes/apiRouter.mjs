import { Router } from "express";
import { ApiController } from "../controllers/apiController.mjs";
import authMiddleware from "./authMiddleware.mjs";

export const apiRouterProtected = Router();
apiRouterProtected.use(authMiddleware);

apiRouterProtected.get("/searchLoaclities", ApiController.searchLoaclities);
apiRouterProtected.get(
  "/getPollutionData/:locality_id",
  ApiController.getPollutionData
);
apiRouterProtected.get(
  "/getPollutionData/:locality_id",
  ApiController.getPollutionData
);

export const apiRouter = Router();
apiRouter.post("/register", ApiController.register);
apiRouter.post("/auth", ApiController.auth);

