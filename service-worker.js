self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("aqm-cache").then(cache =>
      cache.addAll(["./", "index.html", "style.css", "app.js"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
