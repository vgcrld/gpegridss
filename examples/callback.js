/* 
    The question is how do you know what a callback expects
    it's kind of like ruby blocks. you have to know map 
    expects what it expects?
 */
function dostuff(cb, opts) {
    cb(opts);
}

function cb(opts) {
    console.log(opts.name)
}

function cbx(opts) {
    for (let x = 0; x < 10; x++) {
        console.log(opts.name)
    }
}


dostuff(cb, { name: 'richardfsdfsd' })