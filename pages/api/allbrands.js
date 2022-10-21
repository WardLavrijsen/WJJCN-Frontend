// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function AllBrands(req, res) {
  try {
    const resonse = await axios.get(
      `${process.env.API_URL}/get_retailers_and_brands`,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
      }
    );

    res.status(200).json({ status: "ok", data: resonse.data });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
