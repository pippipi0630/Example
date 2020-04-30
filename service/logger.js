// ログ出力ヘルパ
// 本番はlog4jsモジュールとかを使うのが現実的

class Logger {
  /**
   * コンストラクタ
   */
  constructor() {
    // nothing to do
  }

  /**
   * エラー以外の情報出力
   * @param {string} message
   */
  Info(message) {
    console.info(message);
  }

  /**
   * エラー出力
   * @param {string} message
   */
  Error(message) {
    console.error(message);
  }
}

module.exports = new Logger;