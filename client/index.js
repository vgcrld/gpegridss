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
    sideBar: true,   
    groupMultiAutoColumn: false,
    enablePivotMode: true, 
    groupSelectsChildren: true,
    groupUseEntireRow: false,
    showOpenedGroup: false,


    defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
    },

    columnDefs: [
        { headerName: 'Activity', field: 'CfgTsmTimelineActivity', rowGroup: true },
        { headerName: 'Year', field: 'toYear(toStartOfYear(poll_ts))', rowGroup: true },
        { headerName: 'Month', field: 'toMonth(toStartOfMonth(poll_ts))', rowGroup: true },
        { headerName: 'Day', field: 'toDayOfMonth(toStartOfDay(poll_ts))', rowGroup: true },
        { headerName: 'Entity', field: 'CfgTsmTimelineEntity', aggFunc: 'max' },
        { headerName: 'Bytes', field: 'TSMTIMELINE_Bytes', aggFunc: 'max', valueFormatter: commaSeparateNumber }
        // { field: 'TSMTIMELINE_Examined' },
        // { field: 'TSMTIMELINE_Affected' },
        // { field: 'TSMTIMELINE_Failed' },
        // { field: 'TSMTIMELINE_Idle' },
        // { field: 'null' },
        // { field: 'epoch_start' },
        // { field: 'epoch_end' },
        // { field: 'TSMTIMELINE_Mediaw' },
        // { field: 'TSMTIMELINE_Processes' },
        // { field: 'TSMTIMELINE_Completion_code' },
        // { field: 'TSMTIMELINE_Comm_wait' },
        // { field: 'TSMTIMELINE_Bytes_protected' },
        // { field: 'TSMTIMELINE_Bytes_written' },
        // { field: 'TSMTIMELINE_Dedup_savings' },
        // { field: 'TSMTIMELINE_Comp_savings' },
        // { field: 'CfgTsmTimelineActivity_details' },
        // { field: 'CfgTsmTimelineActivity_type' },
        // { field: 'CfgTsmTimelineNumber' },
        // { field: 'CfgTsmTimelineAs' },
        // { field: 'CfgTsmTimelineSub_entity' },
        // { field: 'CfgTsmTimelineCommmeth' },
        // { field: 'CfgTsmTimelineAddress' },
        // { field: 'CfgTsmTimelineSchedule_name' },
        // { field: 'CfgTsmTimelineSuccessful' },
        // { field: 'CfgTsmTimelineVolume_name' },
        // { field: 'CfgTsmTimelineDrive_name' },
        // { field: 'CfgTsmTimelineLibrary_name' },
        // { field: 'CfgTsmTimelineLast_use' },
        // { field: 'CfgTsmTimelineNum_offsite_vols' },
        // { field: 'CfgTsmTimelineInstance' },
        // { field: 'CfgTsmTimelineNodeName' }
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
