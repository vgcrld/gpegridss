import { Grid } from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const gridOptions = {

    rowModelType: 'serverSide',
    serverSideStoreType: 'full',
    animateRows: true,
    enableCharts: true,
    grouping: true,
    enableRangeSelection: true,
    sideBar: false,   
    groupMultiAutoColumn: false,


    defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
    },

    defaultColGroupDef: {

    },

    columnTypes: {
        showColumn: {
            hide: false
        },
        hideColumn: {
            hide: true
        },
        sumColumn: {
            aggFunc: 'sum',
            sortable: true
        },
        maxColumn: {
            aggFunc: 'max',
            sortable: true,
        },
        minColumn: {
            aggFunc: 'min',
            sortable: true,
        },
        valueColumn: {
            aggFunc: 'min',
            sortable: true,
            editable: true,
        },
        groupColumn: {
            rowGroup: true
        },
    },

    columnDefs: [
        { type: ['showColumn'], headerName: 'Activity', field: 'CfgTsmTimelineActivity', rowGroup: true },
        { type: ['showColumn'], headerName: 'Month', field: 'toStartOfMonth(poll_ts)', rowGroup: true },
        { type: ['showColumn'], headerName: 'Day', field: 'toStartOfDay(poll_ts)', rowGroup: true },
        // { type: ['showColumn'], headerName: 'Entity', field: 'CfgTsmTimelineEntity', rowGroup: true },
        { type: ['showColumn', 'sumColumn', 'numericColumn'], headerName: 'Bytes', field: 'TSMTIMELINE_Bytes', valueFormatter: commaSeparateNumber },
        { type: ['showColumn'],    headerName: 'Hour', field: 'poll_ts)' },
        { type: ['showColumn'],    headerName: 'Entity',   field: 'CfgTsmTimelineEntity' },
        { type: ['numericColumn'], headerName: 'Examined', field: 'TSMTIMELINE_Examined' },
        { type: ['numericColumn'], headerName: 'Affected', field: 'TSMTIMELINE_Affected' },
        { type: ['numericColumn'], headerName: 'Failed', field: 'TSMTIMELINE_Failed' },
        { type: ['numericColumn'], headerName: 'Idle', field: 'TSMTIMELINE_Idle' },
        // { type: ['showColumn', 'valueColumn'], headerName: 'Cost', field: 'null' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Start', field: 'epoch_start' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'End', field: 'epoch_end' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Media Wait', field: 'TSMTIMELINE_Mediaw' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Processes', field: 'TSMTIMELINE_Processes' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Completion Code', field: 'TSMTIMELINE_Completion_code' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Comm Wait', field: 'TSMTIMELINE_Comm_wait' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Protected', field: 'TSMTIMELINE_Bytes_protected' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Written', field: 'TSMTIMELINE_Bytes_written' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Dedup Savings', field: 'TSMTIMELINE_Dedup_savings' },
        // { type: ['hideColumn', 'sumColumn', 'numericColumn'], headerName: 'Compression Savings', field: 'TSMTIMELINE_Comp_savings' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Details', field: 'CfgTsmTimelineActivity_details' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Type', field: 'CfgTsmTimelineActivity_type' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Number', field: 'CfgTsmTimelineNumber' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'As Entity', field: 'CfgTsmTimelineAs_entity' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Sub Entity', field: 'CfgTsmTimelineSub_entity' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Comm Method', field: 'CfgTsmTimelineCommmeth' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Address', field: 'CfgTsmTimelineAddress' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Schedule Name', field: 'CfgTsmTimelineSchedule_name' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Successful', field: 'CfgTsmTimelineSuccessful' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Volumne', field: 'CfgTsmTimelineVolume_name' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Drive', field: 'CfgTsmTimelineDrive_name' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Library', field: 'CfgTsmTimelineLibrary_name' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Last Use', field: 'CfgTsmTimelineLast_use' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Offsite Volumes', field: 'CfgTsmTimelineNum_offsite_vols' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Instance', field: 'CfgTsmTimelineInstance' },
        // { type: ['hideColumn', 'maxColumn', 'numericColumn'], headerName: 'Node', field: 'CfgTsmTimelineNodeName' }
    ],

    debug: true,

    cacheBlockSize: 3000,
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

gridOptions.api.setServerSideDatasource(datasource);

function commaSeparateNumber(params){
    let val = params.value;
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }
