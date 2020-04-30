const logger = require("../logger");

// 適当にデータを作って返します。
class ExampleDao {
  constructor() {
    // nothing to do
  }

  Initialize() {
    // DB接続したり、ファイル開いたり
    logger.Info("dao initialized.")
  }

  /**
   * 装置マスタ取得
   * @return {Array<{id:Number, name:String}>}
   */
  async GetMstMachine() {
    return [
      { id: 1, name: "machine-A" },
      { id: 2, name: "machine-B" },
      { id: 3, name: "machine-C" },
      { id: 4, name: "machine-D" },
      { id: 5, name: "machine-E" },
    ];
  }

  /**
   * 品種マスタ取得
   * @return {Array<{id:Number, name:String}>}
   */
  async GetMstOrder() {
    return [
      { id: 1, name: "製品A" },
      { id: 2, name: "製品B" },
      { id: 3, name: "製品C" },
      { id: 4, name: "製品D" },
      { id: 5, name: "製品E" },
      { id: 6, name: "製品F" },
      { id: 7, name: "製品G" },
      { id: 8, name: "製品H" },
      { id: 9, name: "製品I" },
      { id: 10, name: "製品J" },
    ];
  }

  /**
   * データを作って返します
   *  @return {Array<{date:string, machineId:Number, orderId:Number, quantity:Number}>}
   */
  async GetProductLog() {
    let data = [];

    for(let n = 0; n < 50; n++){
      // ランダムなデータを作る
      data.push({
        date: `2020-4-${GetRandom(1,7)}`,
        machineId: GetRandom(1,5),
        orderId: GetRandom(1,10),
        quantity: GetRandom(1,100)
      })
    }

    return data;
  }
}

/**
 * ランダムな整数を得るローカル関数
 * @param {Number} min 
 * @param {Number} max 
 */
function GetRandom(min, max){
  return Math.floor(Math.random() * (max+1 - min)) + min;
}

// クラスオブジェクトをエクスポートする。require先でnewしてから使います。
module.exports = ExampleDao;
