/* 
    This file is the base and gets functionality from 
    the other file in this exports directory
*/


const hello = require('./others')
const data = require('./functions')


const p = p => console.log(p);

p(data.car.model)
p(data.truck.model)

hello.hello()


const x = {}

x.name = 'bob'
x.age = 55
x.data = [1,2,3]

p(x)