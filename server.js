const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const port = process.env.PORT || 8080;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();

//простой тест сервера
app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:3000`);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const { stat, readFile } = require("fs").promises;
app.get("/gallery", (req, res) => {
  stat(`${__dirname}/gallery-images.json`)
    .then(() =>
      /* случается когда есть файла */
      readFile(`${__dirname}/gallery-images.json`, { encoding: "utf8" }).then(
        (text) => {
          res.json(JSON.parse(text));
        }
      )
    )
    .catch(async () => {
      /* случается когда нет файла */
      res.json(`Gallery not found`);
    });
});

app.get("/*", function (req, res) {
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
  return res.send("Hi!;)");
});
app.listen(port, () => console.log(`Server is running on port: ${port}`));
