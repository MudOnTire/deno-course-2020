const res = await window.fetch('https://jsonplaceholder.typicode.com/posts/1');
const data = await res.json();

console.log(data);


