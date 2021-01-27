import {Grid} from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const gridOptions = {

    rowModelType: 'serverSide',
    enableCharts: true,
    enableRangeSelection: true,


    defaultColDef: {
        filter: false,
        sortable: true,
        resizable: true
    },

    columnDefs: [
        { headerName: 'Activity', field: 'CfgTsmTimelineActivity', rowGroup: true, hide: tru },
        { headerName: 'Entity', field: 'CfgTsmTimelineEntity', rowGroup: true, hide: true },
        { headerName: 'Examined', field: 'TSMTIMELINE_Examined', aggFunc: 'sum', type: 'numericColumn'},
        { headerName: 'Affected', field: 'TSMTIMELINE_Affected', aggFunc: 'sum', type: 'numericColumn'},
        { headerName: 'Failed', field: 'TSMTIMELINE_Failed', aggFunc: 'sum', type: 'numericColumn'},
        { headerName: 'MB', field: 'TSMTIMELINE_Bytes', aggFunc: 'sum', type: 'numericColumn'},
        { headerName: 'Date Time', field: 'poll_ts' },
    ],

    // debug: true,
    // cacheBlockSize: 20,
    // maxBlocksInCache: 3,
    // purgeClosedRowNodes: true,
    // maxConcurrentDatasourceRequests: 2,
    // blockLoadDebounceMillis: 1000
};

const gridDiv = document.querySelector('#myGrid');
new Grid(gridDiv, gridOptions);

const datasource = {
    getRows(params) {
         console.log(JSON.stringify(params.request, null, 1));

         fetch('./gpeTsmTimeline/', {
             method: 'post',
             body: JSON.stringify(params.request),
             headers: {"Content-Type": "application/json; charset=utf-8"}
         })
         .then(httpResponse => httpResponse.json())
         .then(response => {
             params.successCallback(response.rows, response.lastRow);
         })
         .catch(error => {
             console.error(error);
             params.failCallback();
         })
    }
};

gridOptions.api.setServerSideDatasource(datasource);