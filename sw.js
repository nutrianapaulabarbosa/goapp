// GO! · service worker: notificações + funcionamento sem internet
const V = 'go-v33';
const SHELL = ['/', '/app', '/config.js', '/manifest.webmanifest', '/logo.svg', '/icon-180.png', '/icon-192.png', '/fonts/Gazpacho-Regular.otf'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // dados e login sempre direto na nuvem (nunca em cache)
  if (url.hostname.endsWith('supabase.co')) return;
  // páginas: tenta a internet primeiro (pra pegar atualizações); sem internet, usa a cópia guardada
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => {
      const copy = r.clone();
      if (r.ok) caches.open(V).then((c) => c.put(url.pathname === '/app.html' ? '/app' : url.pathname, copy));
      return r;
    }).catch(() => caches.match(url.pathname).then((m) => m || caches.match('/app'))));
    return;
  }
  const same = url.origin === self.location.origin;
  const cdn = /fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net/.test(url.hostname);
  if (!same && !cdn) return;
  // arquivos: responde com a cópia guardada e atualiza em segundo plano
  e.respondWith(caches.open(V).then((c) => c.match(req).then((hit) => {
    const net = fetch(req).then((r) => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  })));
});

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: 'GO!', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'GO!', {
    body: d.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: d.tag || 'go',
    data: { url: d.url || '/app' }
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return clients.openWindow((e.notification.data && e.notification.data.url) || '/app');
  }));
});
