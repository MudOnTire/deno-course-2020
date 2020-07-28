import {readJson} from 'https://deno.land/std@0.62.0/fs/mod.ts';

const posts = await readJson('./posts.json');

console.log(posts);