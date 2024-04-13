import "dotenv/config";
import jwt from "jsonwebtoken";
import { OpenWeatherService } from "../services/openWeatherService.mjs";

const secretKey = process.env.APP_KEY;

export class ApiController {
  static async searchLoaclities(req, res) {
    try {
      const localities = await OpenWeatherService.searchLocalities(
        req.query.searchText
      );
      res.status(200).send(localities);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  static async getPollutionData(req, res) {
    const { locality_id } = req.params;
    try {
      const pollutions = await OpenWeatherService.getPollutionData(locality_id);
      res.status(200).send(pollutions);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  static register(req, res) {
    const token = jwt.sign(req.body, secretKey);
    res.cookie("token", token, { maxAge: 3600000 });
    res.status(200).send(token);
  }

  static auth(req, res) {
    const token = jwt.sign(req.body, secretKey);
    res.cookie("token", token, { maxAge: 3600000 });
    res.status(200).send(token);
  }
}
