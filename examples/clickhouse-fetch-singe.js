const fetch = require('node-fetch');

const p = p => console.log(p);

const history = []

const querych = async query => {
    let fullQuery = `http://localhost:8123?query=${query} LIMIT 2 FORMAT JSON`;
    p('02 in querych')
    p(fullQuery);
    const response =  await fetch(fullQuery);
    const data = await response.json();
    p('03 done with querych');
    return data
}
 

p('01 start query');


( async() => { 
    data = await querych('select * from data__rdavis2.__items');
    console.log(data)
})()


p('04 end query');

