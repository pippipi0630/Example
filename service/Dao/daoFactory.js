const Dao = require("./ExampleDao");

class DaoFactory {
  constructor(){}

  Get(){
    return new Dao();
  }
}

// インスタンスをエクスポートする。staticインスタンスのイメージ
module.exports = new DaoFactory();