
class NotYourBest extends Error {
    constructor() {
        super()
        console.log("Creatomg the class")  // this happens when new is called
    }
}

setTimeout(() => {
    throw new NotYourBest("damn, you suck!")
}, 50000)


setTimeout(() => {
    p('hello')
}, 1000)

const p = p => console.log(p);


p('doing this')
p('and that')
p('and waiting...')