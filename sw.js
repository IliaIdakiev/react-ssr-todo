importScripts('/idb.js');

const CACHE_NAME = 'react-pwa-v1';
const DB_NAME = 'react-pwa-v1';

const store = {
  init: async () => {
    this.db = await idb.open(DB_NAME, 1, upgradeDB => {
      upgradeDB.createObjectStore('todos', { keyPath: 'id' });
    });
  },
  add: async (entities) => {
    if (!Array.isArray(entities)) entities = [entities];
    const tx = this.db.transaction('todos', 'readwrite');
    const objectStore = tx.objectStore('todos');

    for (let entity of entities) {
      await objectStore.put(entity);
    }

    return await tx.complete;
  },
  delete: async (entities) => {
    if (!Array.isArray(entities)) entities = [entities];
    const tx = this.db.transaction('todos', 'readwrite');

    for (let entity of entities) {
      await tx.objectStore('todos').delete(entity.id);
    }

    return tx.complete;
  },
  getAll: async () => {
    const tx = this.db.transaction('todos').objectStore('todos');
    return tx.getAll();
  }
}

const REQUIRED_FILES = [
  '/bundle.js',
  '/styles.bundle.css',
  '/favicon.ico',
  '/app-shell'
  // 'manifest.json'
];

addEventListener('install', event => {
  event.waitUntil((async () => {
    await skipWaiting();
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(REQUIRED_FILES);

    await store.init();
    await syncTodos();
  })());
});

addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    for (key of keys) {
      if (key !== CACHE_NAME) await caches.delete(key);
    }

    await clients.claim();
  })());
});

addEventListener('fetch', event => {
  const request = event.request;
  const clonedRequest = request.clone();

  event.respondWith((async () => {
    let response, path;
    try {
      path = request.url.replace(request.referrer, '/');
      if (REQUIRED_FILES.indexOf(path) !== -1) {
        response = await caches.match(path, { cacheName: CACHE_NAME });
        if (response) { response = response.clone(); }
      }
      if (!response) {
        if (request.url.indexOf('/api/posts') && request.method === 'POST') {
          const requestClone = await request.clone();
          const todos = await requestClone.json();
          await store.delete(todos);
          await store.add(todos);
        }
        response = await fetch(request);
      }
    } catch (err) {
      if (request.headers.get('accept').indexOf('text/html') !== -1) {
        response = await caches.match('/app-shell', { cacheName: CACHE_NAME });
        if (response) {
          response = response.clone({ url: request.url });
        }
      } else if (path === '/api/todos') {
        const todos = await store.getAll();
        response = new Response(JSON.stringify(todos), {
          url: request.url,
          headers: {
            'content-type': 'application/json'
          }
        });
      }
    } finally {
      return response;
    }
  })());
});

async function syncTodos() {
  const response = await fetch('/api/todos');
  const todos = await response.json();
  await store.add(todos);
}