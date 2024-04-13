import { pool } from "../database/index.mjs";

export class Pollution {
  static async saveDataIfNoExists(pollutions) {
    try {
      for (let i = 0; i < pollutions.length; i++) {
        const item = pollutions[i];
        const ifExistResp = await pool.query(
          `select * from pollutions where locality_id=${item.locality_id} and time='${item.time}';`,
          []
        );

        if (!ifExistResp.rows.length) {
          await pool.query(
            `insert into pollutions(locality_id, time, co, no, no2, o3, so2, pm2_5, pm10,nh3) values('${item.locality_id}', '${item.time}', '${item.co}', '${item.no}', '${item.no2}', '${item.o3}', '${item.so2}', '${item.pm2_5}', '${item.pm10}', '${item.nh3}');`,
            []
          );
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getDataByLocalityId(locality_id) {
    try {
      const resp = await pool.query(
        `select * from pollutions where locality_id=${locality_id} order by time desc;`,
        []
      );

      return resp.rows;
    } catch (e) {
      throw new Error(e);
    }
  }
}
