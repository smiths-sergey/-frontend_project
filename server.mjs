import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { apiRouterProtected, apiRouter } from "./backend/routes/apiRouter.mjs";

const server = express();
const port = 9500;

server.use(express.json());
server.use(cookieParser());

server.use(express.static(path.join(process.cwd(), "/build")));
server.use("/api", apiRouterProtected);
server.use("/api_1", apiRouter);
server.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd() + "/build/index.html"));
});

server.listen(port, () => {
  console.log(
    `Server is running on port ${port}. This server for backend and frontend. Don't use npm run start. After front changed - need to bulid frontend bundle.: npm run build`
  );
});
