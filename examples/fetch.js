// we need to get node-fetch to get data
const fetch = require('node-fetch')

// status is a func that takes in a repsonse
const status = response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
}
  
// return json
const json = response => response.json()
  
// const query = 'select * from data__rdavis2.__items limit 2 FORMAT JSON'
const query = 'select * from data__atsgroup.__items'

fetch(`http://localhost:8123/?query=${query} FORMAT JSON`)
.then(status)    // note that the `status` function is actually **called** here, and that it **returns a promise***
.then(json)      // likewise, the only difference here is that the `json` function here returns a promise that resolves with `data`
.then(data => {  // ... which is why `data` shows up here as the first parameter to the anonymous function
    console.log('Request succeeded with JSON response', data)
})
.catch(error => {
    console.log('Request failed', error)
})

console.log("Finished")
