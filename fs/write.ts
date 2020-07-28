const encoder = new TextEncoder();

const txt = 'Deno is awesome!';

await Deno.writeFile('doc.txt', encoder.encode(txt));