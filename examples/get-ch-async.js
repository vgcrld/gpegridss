const axios = require('axios')


// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('http://localhost:8123/?query=select 1 FORMAT JSON');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getUser()


/*  

async function myfunction() {
    console.log('Inside of myfunction');
    // const res = await axios.get(":8123/?query=select * from aggrid.cars FORMAT JSON")
    const res = await axios.get("http://localhost:8123/?query=select * from data__atsgroup.__items limit 10 FORMAT JSON")
    return res
}
  
  // Here we wait for the myfunction to finish
  // and then returns a promise that'll be waited for aswell
  // It's useless to wait the myfunction to finish before to return
  // we can simply returns a promise that will be resolved later
  
  // Also point that we don't use async keyword on the function because
  // we can simply returns the promise returned by myfunction
  function start() {
    return myfunction();
  }

  // Call start
  (async() => {
    console.log('before start');
  
    const xx = await start();
    
    console.log('after start: ', xx.data);
  })();


  */

