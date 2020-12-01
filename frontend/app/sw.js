const cacheName = 'bazar-v1'

self.addEventListener('install', function (e) {
   console.log('[[Bazar SW]] Installed');

   e.waitUntil(
      caches.open(cacheName).then(function (cache) {
         console.log('[[Bazar SW]] Caching...');
         /* Adding the webpack plugin assets to cache */
         return cache.addAll([...this.serviceWorkerOption.assets]);
      })
   );
});

self.addEventListener('activate', function (e) {
   console.log('[[Bazar SW]] Activated');

   e.waitUntil(
      caches.keys().then(function (cacheNames) {
         /* Cleaning older caches */
         return Promise.all(cacheNames.map(function (currentCache) {
            if (currentCache !== cacheName) {
               console.log('[[Bazar SW]] Cleaning Cached Files - ', currentCache);
               return Promise.all([caches.delete(currentCache), caches.open(cacheName).then(function (cache) {
                  console.log('[[Bazar SW]] Caching...');
                  /* Adding the webpack plugin assets to cache */
                  return cache.addAll(this.serviceWorkerOption.assets);
               })]);
            }
         }));
      })
   );

});

self.addEventListener('fetch', function (e) {
   console.log('[[Bazar SW]] Fetching : ', e.request.url);
   
   /** 
    * DEV UTILS
    * First chech for API request 
    * */
   if (e.request.url.includes(process.API) && process.env.NODE_ENV === "development") {
      let resourceName = e.request.url.split("/")[e.request.url.split("/").length - 1]

      if (self.serviceWorkerOption.assets.includes(`/resources/${resourceName}.json`)) {
         return e.respondWith(
            caches.match(`/resources/${resourceName}.json`).then(req => req).catch(err => new Response({headers:{status:404}}))
         )        
      } 
   }else if(process.env.NODE_ENV === "development") {
      return e.respondWith(
         fetch(e.request.clone()).then(res => res)
      )
   }

   return e.respondWith(
      caches.open(cacheName).then(function (cache) {
         return cache.match(e.request).then(
            function (res) {
               if (res) {
                  console.log("[[Bazar SW]] From cache : ", e.request)
                  return res;
               }

               return fetch(e.request).then(function (response) {

                  if (!response) {
                     console.log("[[Bazar SW]] Error while fetching : ", e.request.url)
                  }
                  cache.put(e.request, response.clone());

                  return response;
               }).catch(function (err) {
                  console.log('[[Bazar SW]] Error ', err);
               });
            }
         )
      })
   )
})