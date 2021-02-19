import { Grid } from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const tsmColumnDefs = [
    { headerName: 'Activity', field: 'CfgTsmTimelineActivity', rowGroup: true },
    { headerName: 'Year', field: 'toYear(toStartOfYear(poll_ts))', rowGroup: true },
    { headerName: 'Month', field: 'toMonth(toStartOfMonth(poll_ts))', rowGroup: true },
    { headerName: 'Day', field: 'toDayOfMonth(toStartOfDay(poll_ts))', rowGroup: true },
    { headerName: 'Entity', field: 'CfgTsmTimelineEntity', aggFunc: 'max' },
    { headerName: 'Bytes', field: 'TSMTIMELINE_Examined', aggFunc: 'max', valueFormatter: commaSeparateNumber },
    { headerName: 'Bytes', field: 'TSMTIMELINE_Affected', aggFunc: 'max', valueFormatter: commaSeparateNumber },
    { headerName: 'Bytes', field: 'TSMTIMELINE_Failed', aggFunc: 'max', valueFormatter: commaSeparateNumber },
    { headerName: 'Bytes', field: 'TSMTIMELINE_Idle', aggFunc: 'max', valueFormatter: commaSeparateNumber }
];

const tsmDatasource = {
    
    getRows(params) {
        console.log(JSON.stringify(params.request, null, 1));

        fetch('./gpeTsmTimeline/', {
            method: 'post',
            body: JSON.stringify(params.request),
            headers: { "Content-Type": "application/json; charset=utf-8" }
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

var gpeDatasource = tsmDatasource; 

const gridOptions = {

    rowModelType: 'serverSide',
    serverSideStoreType: 'full',
    animateRows: true,
    enableCharts: true,
    grouping: true,
    enableRangeSelection: true,
    sideBar: true,   
    groupMultiAutoColumn: false,
    enablePivotMode: true, 
    groupSelectsChildren: true,
    groupUseEntireRow: false,
    showOpenedGroup: false,

    columnDefs: tsmColumnDefs, 

    defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
    },

    debug: true,

    cacheBlockSize: 3000,
    // maxBlocksInCache: 3,
    // purgeClosedRowNodes: true,
    // maxConcurrentDatasourceRequests: 2,
    // blockLoadDebounceMillis: 1000

};

const gridDiv = document.querySelector('#myGrid');
new Grid(gridDiv, gridOptions);

gridOptions.api.setServerSideDatasource(gpeDatasource);

function commaSeparateNumber(params){
    let val = params.value;
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }
