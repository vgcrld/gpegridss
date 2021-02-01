const { ClickHouse } = require('clickhouse');

const clickHouseOptions = {
    url: 'http://localhost',
    port: 8123,
    debug: false,
    format: 'json',
    basicAuth: null,
    config: {
        database: 'data__rdavis2'
    }
}

const ch = new ClickHouse(clickHouseOptions)

function getRow(response) {
    re
}

async function qdb(sql) {
    try {
        const resp = await ch.query(sql).toPromise()
        console.log(resp)
    } catch(e) {
        console.error(e)
    }

}

const p = text => console.log(text)


process.exit()

// qdb('select * from __items limit 1')