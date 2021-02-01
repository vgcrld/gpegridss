const axios = require('axios')

const getit = async query => {
    try{
        const res = await axios.get(`http://127.0.0.1:8123?query=${query} FORMAT JSON`);
        cols = res.data.meta.map( r => {
            return {
                headerName: r.name, sortable: true, filter: true 
            }
        })
        console.log(cols)
    } catch(err) {
        console.log(`query failed: '${query}'`, err.response.statusText)
    }
}


getit(`select * from data__rdavis2.__trends limit 10`)