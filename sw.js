//サービスワーカーを記述するファイル sw.js

//キャッシュにはキャッシュ名が付けられる。
//あるキャッシュ名でキャッシュされた情報はブラウザ側に存在する限り二度と読み込まれない。
//キャッシュする情報が変わるたびに CACHE_NAME も変える。
//バージョン番号をつけて管理するのも良い方法の一つである。
var CACHE_NAME = 'hoge-firebase-0.1.6';
var urlsToCache = [
  '/',
  '/manifest.json',
  '/index.html',
  '/click.js',
  '/firebase.js',
  '/pwa.js',
  '/style.css',
  /*'https://www.gstatic.com/firebasejs/5.8.0/firebase.js'*/
];

self.addEventListener('install', function(event) {
  console.log("'install' event is fired.");
  event.waitUntil(self.skipWaiting());
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Waiting for cache completion. ")
      return cache.addAll(urlsToCache);
    }).catch(function(e){
      console.log(e); 
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log("'activate' event is fired.");
  event.waitUntil(
    //現在キャッシュされているもののキャッシュ名の一覧を得て古いものは破棄
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(cacheName) {
        if ([CACHE_NAME].indexOf(cacheName) === -1) {
          console.log(cacheName + " should be deleted.");
          return caches.delete(cacheName);
        }
      }));
    }).catch(function(e){console.log(e);})
  );
});



self.addEventListener('fetch', function(event) {
  console.log("'fetch' event is fired.");
  event.respondWith(
    //リクエストされたものがキャッシュの中にあればレスポンス返す
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    ).catch(function(e){
        console.log(e);
    })
  );
});
