import fastify from 'fastify';

const app = fastify();

// Define a simple route
app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Start the server using FastifyListenOptions
const start = async () => {
  try {
    await app.listen({
      port: 3000, // or you can use "host" and "port" together here
      host: '0.0.0.0',
    });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
