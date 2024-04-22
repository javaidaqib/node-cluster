import express from "express";
import os from "os";
import cluster from "cluster";

import {
  computationallyExpensiveRoute,
  simpleRoute,
} from "./controller/index.js";

const totalCPUCors = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUCors; i++) {
    cluster.fork();
  }
  console.log(`Primary cluster process with PID ${process.id} is running.`);

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker Process ID ${worker.process.id} has died. Restarting the Worker process...`
    );
    cluster.fork();
  });
} else {
  const app = express();

  app.get("/simple-route", simpleRoute);
  app.get("/expensive-route", computationallyExpensiveRoute);

  const PORT = 6000;

  app.listen(PORT, () =>
    console.log(
      `Worker Cluster with PID ${process.pid} is listening on PORT ${PORT}`
    )
  );
}
