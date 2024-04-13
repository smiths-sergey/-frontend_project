import { pool } from "../database/index.mjs";

export class Locality {
  static async createIfNotExistByAttrsAndGet(title, lat, lon) {
    try {
      const ifExistResp = await pool.query(
        `select * from localities where lat='${lat}' and lon='${lon}'`,
        []
      );

      if (ifExistResp.rows.length) {
        return ifExistResp.rows[0];
      }

      const createResp = await pool.query(
        `insert into localities(title, lat, lon) values('${title}', '${lat}', '${lon}') returning *`,
        []
      );
      return createResp.rows[0];
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getCoordinatesById(locality_id) {
    try {
      const resp = await pool.query(
        `select * from localities where id=${locality_id}`,
        []
      );
      return {
        lat: resp.rows[0].lat,
        lon: resp.rows[0].lon,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
