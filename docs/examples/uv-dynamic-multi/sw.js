importScripts('/dynamic/dynamic.config.js');
importScripts('/dynamic/dynamic.worker.js');
importScripts('dist/uv.bundle.js');
importScripts('dist/uv.config.js');
importScripts(__uv$config.sw || 'dist/uv.sw.js');

const uv = new UVServiceWorker();
const dynamic = new Dynamic();

self.dynamic = dynamic;

async function handleRequest(event) {
    if (await dynamic.route(event)) {
        return await dynamic.fetch(event);
    }

    if (uv.route(event)) {
        return await uv.fetch(event);
    }
    
    return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});