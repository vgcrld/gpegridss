const p = p => console.log(p);
const buf = Buffer.from('dgjeglkjadgljadlgjaslk');
const bufJSON = buf.toJSON();

p(bufJSON)
// bufJSON.data.forEach( val => {
//     p(val.toString())
// })