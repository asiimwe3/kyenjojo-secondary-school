var CACHE='kss-v1';
var ASSETS=['./','./index.html','./manifest.json','./favicon.png','./images/logo_small.png','./images/crest_512.png','./images/hero1.jpg?v=1','./images/hero2.jpg?v=1','./images/hero3.jpg?v=1','./images/hero4.jpg?v=1','./images/classroom.jpg?v=1','./images/ict_lab.jpg?v=1','./images/cta_band.jpg?v=1','./images/gallery1.jpg?v=1'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}).then(function(){self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}).then(function(){self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(res){
      var copy=res.clone();
      caches.open(CACHE).then(function(c){c.put(e.request,copy)});
      return res;
    }).catch(function(){
      return caches.match(e.request).then(function(h){return h||caches.match('./')});
    })
  );
});
