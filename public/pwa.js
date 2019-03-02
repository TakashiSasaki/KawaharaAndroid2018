//サービスワーカー sw.js を登録する
//index.html において script タグでこのファイル pwa.js を読み込みむ。
//ChromeでF12キーを押下して開く Chrome Dev Tools などで確認する。
navigator.serviceWorker.register('/sw.js').then(function() {
  console.log('サービスワーカー登録成功');
}).catch(function(err) {
  console.log('サービスワーカー登録失敗', err);
});

