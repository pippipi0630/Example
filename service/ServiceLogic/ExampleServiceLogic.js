const logger = require("../logger");
const daoFactory = require("../Dao/daoFactory");

class ExpressServiceLogic {
  /**
   * 装置マスタ
   * @return {Array<{id:Number, name:String}>}
   */
  get MstMachine() {
    return this._mstMachine;
  }

  /**
   * 品種マスタ
   * @return {Array<{id:Number, name:String}>}
   */
  get MstOrder() {
    return this._mstOrder;
  }

  /**
   * 生産履歴
   * @return {Array<{machineId:Number, orderId:Number, quantity:Number}>}
   */
  get ProductLog() {
    return this._productLog;
  }

  // コンストラクタ
  constructor() {
    this._mstMachine = [];
    this._mstOrder = [];
    this._productLog = [];

    // Daoインスタンスを取得
    this.dao = daoFactory.Get();
  }

  /**
   * 初期化する
   */
  async Initialize() {
    this.dao.Initialize();

    // 装置マスタの初期化
    this._mstMachine = await this.dao.GetMstMachine();
    // 品種マスタの初期化
    this._mstOrder = await this.dao.GetMstOrder();
    // 生産履歴の初回取得
    this._productLog = await this.dao.GetProductLog();

    // 生産履歴の定期更新タイマをスタート（５secおき）
    setInterval(() => {
      this.UpdateProductLog();
    }, 5000);

    logger.Info("service initialized");
  }

  /**
   * 内部保持しているデータを更新
   */
  UpdateProductLog() {
    // 非同期更新
    this.dao.GetProductLog().then((data) => {
      this._productLog = data;
      // logger.Info("updated data.");
    });
  }
}

module.exports = ExpressServiceLogic;
