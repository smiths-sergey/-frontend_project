import axios from "axios";
import "dotenv/config";
import { Locality } from "../models/Locality.mjs";
import { Pollution } from "../models/Pollution.mjs";

const appid = process.env.API_KEY_OPENWEATHER;

export class OpenWeatherService {
  static async searchLocalities(searchText) {
    if (!searchText) return [];
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          appid: appid,
          q: searchText,
          limit: 10,
        },
      }
    );

    //console.log("localities", response.data);
    const localities = [];
    for (let i = 0; i < response.data.length; i++) {
      const item = response.data[i];
      const { lat, lon } = item;
      let title = item?.local_names?.ru || item.name;
      title = title + ` / ${item.country}`;

      const locality = await Locality.createIfNotExistByAttrsAndGet(
        title,
        lat,
        lon
      );

      localities.push({
        title: title,
        lat: lat,
        lon: lon,
        id: locality.id,
      });
    }
    return localities;
  }
  static async getPollutionData(locality_id) {
    if (locality_id == "null") return [];
    const coordinates = await Locality.getCoordinatesById(locality_id);
    const respCurrentPollution = await axios.get(
      "http://api.openweathermap.org/data/2.5/air_pollution",
      {
        params: {
          appid: appid,
          lat: coordinates.lat,
          lon: coordinates.lon,
        },
      }
    );

    const rangeTimeStamps = get24oursTimestaps(
      respCurrentPollution.data.list[0].dt
    );

    const respHistoryRangePollution = await axios.get(
      "http://api.openweathermap.org/data/2.5/air_pollution/history",
      {
        params: {
          appid: appid,
          lat: coordinates.lat,
          lon: coordinates.lon,
          start: rangeTimeStamps.start,
          end: rangeTimeStamps.end,
        },
      }
    );

    const pollutions = [];
    for (let i = 0; i < respHistoryRangePollution.data.list.length; i++) {
      const item = respHistoryRangePollution.data.list[i];
      const pollution = {
        locality_id: locality_id,
        time: getDbFormattedTimestapmp(item.dt),
        co: item.components.co,
        no: item.components.no,
        no2: item.components.no2,
        o3: item.components.o3,
        so2: item.components.so2,
        pm2_5: item.components.pm2_5,
        pm10: item.components.pm10,
        nh3: item.components.nh3,
      };
      pollutions.push(pollution);
    }
    await Pollution.saveDataIfNoExists(pollutions);
    const rows = await Pollution.getDataByLocalityId(locality_id);
    return rows;
  }
}

function get24oursTimestaps(timestamp) {
  const date = new Date(timestamp * 1000);
  date.setMinutes(0);
  date.setSeconds(0);
  const startOfHourTimestamp = date.getTime() / 1000;
  const minus24HoursTimestamp = startOfHourTimestamp - 24 * 60 * 60;

  return {
    start: minus24HoursTimestamp,
    end: startOfHourTimestamp,
  };
}

function getDbFormattedTimestapmp(timestamp) {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
  return formattedDate;
}
