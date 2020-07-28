import { v4 } from "https://deno.land/std@0.62.0/uuid/mod.ts";

const myUUID = v4.generate();

console.log(myUUID);