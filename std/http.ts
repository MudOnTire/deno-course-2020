import { serve } from 'https://deno.land/std@0.62.0/http/mod.ts';

const server = serve({
  port: 3000
});

console.log('listening on port 3000');

for await (const req of server) {
  req.respond({
    body: `<h1>Hello, Deno!!</h1>`
  });
}