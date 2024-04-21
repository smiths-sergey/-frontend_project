import PG from "pg";
const Pool = PG.Pool;

export const pool = new Pool({
  user: "admin",
  password: "1234",
  database: "events_world",
  host: "localhost",
  port: "9000",
});
