const express = require("express");
const cors = require("cors");
const ServiceLogic = require("./ServiceLogic/ExampleServiceLogic");
const logger = require("./logger");

const listenPort = 3000;

const app = express();

const service = new ServiceLogic();

// corsの許可
app.use(cors());

// 提供する静的ファイルが格納されているフォルダを指定
app.use(express.static(__dirname + "/dist"));


// ----- 以下、apiのルーティング設定 -----

// 画面の送付
app.get("/", (req, res) => {
  logger.Info(`requested from ${req.ip}`);
  res.sendFile(__dirname + "/dist/index.html");
});

// 装置マスタの取得
app.get("/master/machine", (req, res) => {
  res.json(service.MstMachine);
});

// 品種マスタの取得
app.get("/master/order", (req, res) => {
  res.json(service.MstOrder);
});

// 生産履歴の取得
app.get("/data", (req, res) => {
  res.json(service.ProductLog);
});

// service の Initialize が完了したらリッスン開始
service.Initialize().then(() => {
  // リッスン開始
  app.listen(listenPort);
  logger.Info(`service listening on port ${listenPort}`);
});
