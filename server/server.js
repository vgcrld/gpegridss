import express from 'express';
import { ClickHouse } from 'clickhouse';
import GpeDataService from './gpeDataService.js';
import bodyParser from 'body-parser';

const gpedata = new GpeDataService()

const site = 'DandH';

const connection =  new ClickHouse({
      url: "http://localhost",
      port: 8123,
      debug: false,
      basicAuth: null,
      isUseGzip: false,
      format: "json",
      config: {
        session_timeout: 60,
        output_format_json_quote_64bit_integers: 0,
        enable_http_compression: 0,
        database: `data__${site}`,
      },
    });

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use(express.static('public'))
app.use('/javascript', express.static('public/javascript'))
app.use('/views', express.static('public/views'))
app.use('/styes', express.static('public/styes'))

// app.get('/', function(req, res){
//     res.redirect('/views/index.html');
// });

app.get('/types', function (req, res) {
    let sql = `select distinct type from __items`
    gpedata.getGpeData(sql, connection, req.body, (rows) => {
        res.json({rows: rows});
    });
});

app.get('/tags', function (req, res) {
    let sql = `select distinct toString(tags) as tags from __items`
    gpedata.getGpeData(sql, connection, req.body, (rows) => {
        res.json({rows: rows});
    });
});

app.get('/tsmactivity', function (req, res) {
    let sql = `select distinct CfgTsmTimelineActivity as activity from transient_tsmtimeline`
    gpedata.getGpeData(sql, connection, req.body, (rows) => {
        res.json({rows: rows});
    });
});

app.get('/tsmentity', function (req, res) {
    let sql = `select distinct CfgTsmTimelineEntity as entity from transient_tsmtimeline`
    gpedata.getGpeData(sql, connection, req.body, (rows) => {
        res.json({rows: rows});
    });
});

app.get('/names', function (req, res) {
    let sql = `select distinct name from __items where type in ('brocade','host')`
    gpedata.getGpeData(sql, connection, req.body, (rows) => {
        res.json({rows: rows});
    });
});

app.get('/gpeItems', function (req, res) {
    gpedata.getDataForGrid(connection, '__items', req.body, (rows, lastRow) => {
        res.json({rows: rows, lastRow: lastRow});
    });
});

app.post('/gpeTsmTimeline', function (req, res) {
    gpedata.getDataForGrid(connection, 'transient_tsmtimeline', req.body, (rows, lastRow) => {
        res.json({rows: rows, lastRow: lastRow});
    });
});

app.listen(4000, () => {
    console.log('Started on localhost:4000');
});