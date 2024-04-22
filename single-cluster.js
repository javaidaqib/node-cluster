import express from "express";

import {
  computationallyExpensiveRoute,
  simpleRoute,
} from "./controller/index.js";

const app = express();

app.get("/simple-route", simpleRoute);
app.get("/expensive-route", computationallyExpensiveRoute);

const PORT = 6000;

app.listen(PORT, () =>
  console.log(
    `Single Cluster server with Process ID ${process.pid} is running on PORT ${PORT}`
  )
);
