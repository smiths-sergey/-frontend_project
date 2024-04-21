import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/User.mjs";
import { Todo } from "../models/Todo.mjs";

const secretKey = process.env.APP_KEY;

export class ApiController {
  static async todoList(req, res) {
    const result = await Todo.todoList(req.user.id);
    if (result) {
      res.status(200).send(result);
      return;
    }

    res.status(404).json({ message: "User or Record not found" });
  }

  static async todoCreate(req, res) {
    const result = await Todo.todoCreate(req.user.id, req.body);
    if (result) {
      res.status(201).send(result);
      return;
    }

    res.status(404).json({ message: "User or Record not found" });
  }

  static async todoUpdate(req, res) {
    const result = await Todo.todoUpdate(req.user.id, req.body);
    if (result) {
      res.status(200).send(result);
      return;
    }

    res.status(404).json({ message: "User or Record not found" });
  }

  static async todoDelete(req, res) {
    const result = await Todo.todoDelete(req.user.id, req.params.id);
    if (result) {
      res.status(200).send(result);
      return;
    }
    res.status(404).json({ message: "User or Record not found" });
  }

  static async user(req, res) {
    const token = req.cookies.token;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      res.status(200).send(decoded);
    });
  }

  static async register(req, res) {
    const result = await User.register(
      req.body.login,
      req.body.psw,
      req.body.email
    );
    const jwt_payload = {
      id: result.id,
      login: result.login,
      email: result.email,
    };
    const token = jwt.sign(jwt_payload, secretKey);
    res.cookie("token", token, { maxAge: 3600000 });
    res.status(200).send(jwt_payload);
  }

  static async auth(req, res) {
    const user = await User.auth(req.body.login, req.body.psw);
    if (!user) {
      return res.status(401).json({
        message: "Пользователь с указанным логином и паролем не найден",
      });
    }
    const jwt_payload = {
      id: user.id,
      login: user.login,
      email: user.email,
    };
    const token = jwt.sign(jwt_payload, secretKey);
    res.cookie("token", token, { maxAge: 3600000 });
    res.status(200).send(jwt_payload);
  }
}
