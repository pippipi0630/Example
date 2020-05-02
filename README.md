Client : Vue.js で実装しました

Server : Node.js で実装しました

サーバの実行とClientのビルドにはNode.jsのインストールが必要です。

https://nodejs.org/ja/

# サーバの実行
インストール後、コンソールからServiceディレクトリへ移動して下記実行

$ node index.js

サービス実行後、 ブラウザから http://localhost:3000 へアクセスすることでClientを起動できます。

# 改造を反映する
Clientのコードを改造したら、ビルドしなおしてService/distを置き換える必要があります。

１． コード修正

２． Clientディレクトリにて $ yarn build を実行 → 自動で distディレクトリ が出力される

３． Clientディレクトリに出力されたdistを全コピして Serviceディレクトリのdistと総入れ替えする

 

もしくは、Clientディレクトリにて、下記実行することにより、デバッグサービスが起動して

変更を即時反映してくれるようになります。

$ yarn serve

その場合は、Client/src/App.vue に記載されている、４６行目を下記の通り変更してください。

 (-) cosnt serviceAddr = location.href;

 (+) const serviceAddr = "http://localhost:3000";

