// process.env.UV_THREADPOOL_SIZE = 2;
// const cluster = require("cluster");

// // Is the file being executed in master mode?
// if (cluster.isMaster) {
//   // Cause index.js to be executed *again* but
//   // in child mode
//   cluster.fork();
//   //   cluster.fork();
//   //   cluster.fork();
//   //   cluster.fork();
// } else {

// Im a child, Im going to act like a server
// and do nothing else
const express = require("express");
const crypto = require("crypto");
const app = express();
const Worker = require("webworker-threads").Worker;

app.get("/", (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;

      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function(message) {
    console.log(message.data);
    res.send("" + message.data);
  };

  worker.postMessage();
});

// app.get("/", (req, res) => {
//   crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
//     res.send("Hi there");
//   });
// });

app.get("/fast", (req, res) => {
  res.send("This was fast");
});

app.listen(3000);
//pm2 start index.js -i 0
//pm2 list
//pm2 show index
//pm2 monit
//pm2 delete index

// npm install webworker-threads
