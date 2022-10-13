// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function AllBrands(req, res) {
  try {
    const resonse = await axios.get(
      "https://cjlvairppc.execute-api.eu-central-1.amazonaws.com/testing/get_retailers_by_brand",
      {
        headers: {
          "x-api-key": "tk5MO5jZjh4szZkROdZ9I5IFQiSb0tmY34uQ6VTg",
        },
        data: {
          name: req.query.name,
        },
      }
    );

    const data = JSON.parse(resonse.data);
    res.status(200).json({ status: "ok", data });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
