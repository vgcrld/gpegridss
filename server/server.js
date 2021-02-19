import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import express from 'express';
import bodyParser from 'body-parser';
import { ClickHouse } from 'clickhouse';

import GpeDataService from './gpeDataService';

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
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/gpeTsmTimeline', function (req, res) {
    GpeDataService.getData(connection, 'transient_tsmtimeline', req.body, (rows, lastRow) => {
        res.json({rows: rows, lastRow: lastRow});
    });
});

app.post('/gpeItems', function (req, res) {
    GpeDataService.getData(connection, '__items', req.body, (rows, lastRow) => {
        res.json({rows: rows, lastRow: lastRow});
    });
});

app.listen(4000, () => {
    console.log('Started on localhost:4000');
});