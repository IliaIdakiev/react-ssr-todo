importScripts('/idb.js');

const CACHE_NAME = 'react-pwa-v1';
const DB_NAME = 'react-pwa-v1';

const store = {
  init: async () => {
    this.db = await idb.open(DB_NAME, 1, upgradeDB => {
      upgradeDB.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
    });
  },
  add: async (entities) => {
    if (!Array.isArray(entities)) entities = [entities];
    const tx = this.db.transaction('todos', 'readwrite');
    const objectStore = tx.objectStore('todos');

    for (let entity of entities) {
      if (entity.id === -1) delete entity.id;
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
  },
  deleteDB: async function (name) {
    this.initialized = false;
    return idb.delete(name);
  }
}

const REQUIRED_FILES = [
  '/bundle.js',
  '/styles.bundle.css',
  '/favicon.ico',
  '/app-shell',
  '/img/about.jpg'
  // 'manifest.json'
];

addEventListener('install', event => {
  event.waitUntil((async () => {
    await skipWaiting();
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(REQUIRED_FILES);

    await store.deleteDB(DB_NAME);
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
      path = request.url.replace('http://localhost:3000/', '/');
      if (REQUIRED_FILES.indexOf(path) !== -1) {
        response = await caches.match(path, { cacheName: CACHE_NAME });
        if (response) { response = response.clone(); }
      }
      if (!response) {
        if (request.url.indexOf('/api/posts') && request.method === 'POST') {
          const requestClone = await request.clone();
          let todos = await requestClone.json();
          todos = Array.isArray(todos) ? todos : [todos];
          todos.map(todo => {
            todo.id = +todo.id;
            todo.completed = !!todo.completed;
          });
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
      } else if (path.indexOf('/api/todos') !== -1) {
        const [, id] = (/\?id=(\d+)$/.exec(path) || [, null]);
        let result = await store.getAll();
        if (id) result = result.find(todo => todo.id === +id);
        response = new Response(JSON.stringify(result), {
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