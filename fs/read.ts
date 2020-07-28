const decoder = new TextDecoder('utf-8');

const data = await Deno.readFile('doc.txt');

console.log(decoder.decode(data));