import { pool } from "../database/index.mjs";
import sha256 from "crypto-js/sha256.js";
import { v4 as uuidv4 } from "uuid";

export class User {
  static async register(login, psw, email) {
    try {
      const respIfExists = await pool.query(
        `select * from users where login='${login}'`,
        []
      );

      const psw_salt = uuidv4();
      const psw_hash = sha256(psw + psw_salt).toString();
      if (respIfExists.rows.length) {
        const respUpdate = await pool.query(
          `update users set email='${email}', psw_salt='${psw_salt}',psw_hash='${psw_hash}' where login='${login}' returning *`,
          []
        );
        return respUpdate.rows[0];
      } else {
        const respInsert = await pool.query(
          `insert into users(login, email, psw_salt,psw_hash) values('${login}', '${email}', '${psw_salt}','${psw_hash}') returning *`,
          []
        );
        return respInsert.rows[0];
      }
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
