import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { apiRouterProtected, apiRouter } from "./backend/routes/apiRouter.mjs";

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use("/api", apiRouterProtected);
server.use("/api_1", apiRouter);
server.use(express.static(path.join(process.cwd(), "/build")));
// Отправка index.html для любого запроса, который не соответствует API роутам
server.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd() + "/build/index.html"));
});

server.listen(9500, () => {
  console.log(
    "listening on port 9500. This server for backend and frontend. Don't use npm run start. After front changed - need to bulid frontend bundle.: npm run build"
  );
});
