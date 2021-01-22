const keyboardcache = "keyboardhero"
const assets = [
    "keyboard-hero.html",
    "js/jquery-1.7.1.min.js",
    "js/jquery-ui-1.8.18.custom.min.js",
    "js/DPTP.js",
    "js/cache.js",
    "js/7428266.js",
    "js/typingdna.js",
    "js/word.js",
    "js/index.js",
    "css/3wa.css",
    "css/base.css",
    "css/index.css",
    "css/inconsolata.css",
    "img/cards/css.png",
    "img/cards/html.png",
    "img/cards/javascript.png",
    "img/cards/projets.png",
    "img/fond-lettres_menu-principal.svg",
    "img/logo-mono-white.svg",
    "img/logo-white.svg",
    "img/mains.svg",
    
]


// Call install Event
self.addEventListener('install',(event)=> {
   if(navigator.onLine)
   {
    event.waitUntil(
      caches.keys().then(keyboardcache => {
          return Promise.all(
              keyboardcache.map(cache => {
                  if(cache != keyboardcache) {
                  
                      return caches.delete(cache);
                  }
              })
          )
      })
    )
    
   }
  event.waitUntil(
    caches.open(keyboardcache)
      .then((cache)=> {
        //Cache has been opened successfully
         cache.addAll(assets);
        //return cache.addAll(assets);
      })
      .then(() => self.skipWaiting())
  );
});


// Call Activate Event
self.addEventListener('activate',(event)=> {
   
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(keyboardcache => {
            return Promise.all(
                keyboardcache.map(cache => {
                    if(cache != keyboardcache) {
                    
                        return caches.delete(cache);
                    }
                })
            )
        })
      );

});

// Call Fetch Event
self.addEventListener('fetch',(event)=> {

  event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
  )
});