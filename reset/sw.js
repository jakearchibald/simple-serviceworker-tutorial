self.addEventListener('install', function(event) {
  // delete all the caches
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});