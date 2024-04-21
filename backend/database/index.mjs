import PG from "pg";
const Pool = PG.Pool;

export const pool = new Pool({
  user: "admin",
  password: "1234",
  database: "todos",
  host: "localhost",
  port: "9000",
});
