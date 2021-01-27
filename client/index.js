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
            rowGroup: true, 
        },
    },

    columnDefs: [
        { type: [ 'showColumn', 'groupColumn' ], headerName: 'Activity', field: 'CfgTsmTimelineActivity' },
        { type: [ 'showColumn', 'groupColumn' ], headerName: 'Entity', field: 'CfgTsmTimelineEntity' },
        { type: [ 'showColumn', 'valueColumn' ], headerName: 'Cost', field: 'null'},
        { type: [ 'showColumn', 'minColumn' ], headerName: 'Timestamp', field: 'poll_ts' },
        { type: [ 'showColumn', 'sumColumn' ], headerName: 'Bytes', field: 'TSMTIMELINE_Bytes' },
        { type: [ 'hideColumn', 'minColumn' ], headerName: 'Start', field: 'epoch_start' },
        { type: [ 'hideColumn', 'minColumn' ], headerName: 'End', field: 'epoch_end' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Examined', field: 'TSMTIMELINE_Examined' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Affected', field: 'TSMTIMELINE_Affected' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Failed', field: 'TSMTIMELINE_Failed' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Idle', field: 'TSMTIMELINE_Idle' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Media Wait', field: 'TSMTIMELINE_Mediaw' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Processes', field: 'TSMTIMELINE_Processes' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Completion Code', field: 'TSMTIMELINE_Completion_code' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Comm Wait', field: 'TSMTIMELINE_Comm_wait' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Protected', field: 'TSMTIMELINE_Bytes_protected' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Written', field: 'TSMTIMELINE_Bytes_written' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Dedup Savings', field: 'TSMTIMELINE_Dedup_savings' },
        { type: [ 'hideColumn', 'sumColumn' ], headerName: 'Compression Savings', field: 'TSMTIMELINE_Comp_savings' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Details', field: 'CfgTsmTimelineActivity_details' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Type', field: 'CfgTsmTimelineActivity_type' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Number', field: 'CfgTsmTimelineNumber' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'As Entity', field: 'CfgTsmTimelineAs_entity' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Sub Entity', field: 'CfgTsmTimelineSub_entity' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Comm Method', field: 'CfgTsmTimelineCommmeth' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Address', field: 'CfgTsmTimelineAddress' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Schedule Name', field: 'CfgTsmTimelineSchedule_name' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Successful', field: 'CfgTsmTimelineSuccessful' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Volumne', field: 'CfgTsmTimelineVolume_name' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Drive', field: 'CfgTsmTimelineDrive_name' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Library', field: 'CfgTsmTimelineLibrary_name' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Last Use', field: 'CfgTsmTimelineLast_use' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Offsite Volumes', field: 'CfgTsmTimelineNum_offsite_vols' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Instance', field: 'CfgTsmTimelineInstance' },
        { type: [ 'hideColumn', 'maxColumn' ], headerName: 'Node', field: 'CfgTsmTimelineNodeName' }
    ]

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