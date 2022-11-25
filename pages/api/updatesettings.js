// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function updateSettings(req, res) {
  try {
    const resonse = await axios.get(
      `${process.env.API_URL}/update_scrape_date_time`,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
        data: {
          token: req.query.token,
          time_to_scrape: req.query.time,
          day_to_scrape: req.query.day,
        },
      }
    );

    res.status(200).json({ status: "ok", data: resonse.data });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
