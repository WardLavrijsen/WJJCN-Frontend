// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function Products(req, res) {
  try {
    const resonse = await axios.get(
      `${process.env.API_URL}/get_retailers_with_score`,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
        data: {
          name: req.query.name,
          retailer: req.query.retailer,
        },
      }
    );

    const data = JSON.parse(resonse.data);
    res.status(200).json({ status: "ok", data });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
