// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function login(req, res) {
  const body = JSON.parse(req.body);
  try {
    const resonse = await axios({
      method: "post",
      url: `${process.env.API_URL}/add_retailer`,
      data: {
        scrape: body.scrape,
        name: body.name,
        base_url: body.base_url,
        url_to_scrape: body.url_to_scrape,
        token: body.token,
      },
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });

    res.status(200).json({ status: "ok", data: resonse.data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
}
