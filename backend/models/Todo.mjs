import { pool } from "../database/index.mjs";
import sha256 from "crypto-js/sha256.js";

export class Todo {
  static async todoList(user_id) {
    try {
      const resp = await pool.query(
        `select * from todos where user_id='${user_id}' order by id desc`,
        []
      );
      return resp.rows;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async todoCreate(user_id, todo) {
    try {
      const { date, description, is_completed } = todo;
      const createResp = await pool.query(
        `insert into todos (user_id, date, description, is_completed) values('${user_id}', '${date}', '${description}', '${is_completed}') returning *`,
        []
      );
      return "succsess";
    } catch (e) {
      throw new Error(e);
    }
  }

  static async todoUpdate(user_id, todo) {
    try {
      const res = await pool.query(
        `update todos set is_completed=${todo.is_completed} where id='${todo.id}' and user_id='${user_id}' returning *`,
        []
      );
      if (res.rows.length) {
        return "succsess";
      }
      return false;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async todoDelete(user_id, id) {
    try {
      const checkResp = await pool.query(
        `select * from todos where user_id='${user_id}' and id='${id}'`,
        []
      );
      if (!checkResp.rows.length) return false;
      await pool.query(
        `delete from todos where user_id='${user_id}' and id='${id}'`,
        []
      );

      const rows = await Todo.todoList(user_id);
      return rows;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async auth(login, psw) {
    const respIfExists = await pool.query(
      `select * from users where login='${login}'`,
      []
    );

    if (!respIfExists.rows.length) {
      return null;
    }
    const user = respIfExists.rows[0];
    const psw_hash_check = sha256(psw + user.psw_salt).toString();
    if (user.psw_hash == psw_hash_check) {
      return { id: user.id, login: user.login, email: user.email };
    }
    return null;
  }
}
