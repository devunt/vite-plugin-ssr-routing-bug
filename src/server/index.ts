import middie from '@fastify/middie';
import fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderPage } from 'vite-plugin-ssr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = fastify();
await app.register(middie);

if (process.env.NODE_ENV === 'development') {
  const vite = await import('vite');
  const server = await vite.createServer({
    root: path.dirname(path.dirname(__dirname)),
    appType: 'custom',
    server: { middlewareMode: true },
  });
  await app.use(server.middlewares);
} 

app.get('/healthz', () => 'ok');

app.route({
  method: ['GET', 'POST'],
  url: '*',
  handler: async (request, reply) => {
    const { httpResponse, errorWhileRendering } = await renderPage({
      urlOriginal: request.url,
    });

    if (httpResponse === null) {
      return reply.status(500).send('Internal Server Error');
    }

    const { statusCode, contentType, pipe } = httpResponse;
    reply.raw.writeHead(statusCode, { 'Content-Type': contentType });
    pipe(reply.raw);
  },
});

try {
  const address = await app.listen({ host: '0.0.0.0', port: 4000 });
  console.log(`🚀 Vite server is running on ${address}...`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
