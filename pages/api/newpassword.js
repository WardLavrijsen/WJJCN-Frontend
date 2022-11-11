// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function login(req, res) {
  console.log(req.query.token);
  console.log(req.query.password);
  try {
    const resonse = await axios.get(`${process.env.API_URL}/update_password`, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
      data: {
        password: req.query.password,
        token: req.query.token,
      },
    });

    res.status(200).json({ status: "ok", data: resonse.data });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
