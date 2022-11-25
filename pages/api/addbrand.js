// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function addbrand(req, res) {
  const body = JSON.parse(req.body);
  try {
    const resonse = await axios({
      method: "post",
      url: `${process.env.API_URL}/add_brand`,
      data: body,
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
