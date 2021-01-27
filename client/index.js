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
        { type: [ 'groupColumn' ], headerName: 'Activity', field: 'CfgTsmTimelineActivity' },
        { type: [ 'groupColumn' ], headerName: 'Entity', field: 'CfgTsmTimelineEntity' },
        { type: [ 'valueColumn' ], headerName: 'Cost', field: 'null'},
        { type: [ 'minColumn' ], headerName: 'Timestamp', field: 'poll_ts' },
        { type: [ 'minColumn' ], headerName: 'Start', field: 'epoch_start' },
        { type: [ 'minColumn' ], headerName: 'End', field: 'epoch_end' },
        { type: [ 'sumColumn' ], headerName: 'Examined', field: 'TSMTIMELINE_Examined' },
        { type: [ 'sumColumn' ], headerName: 'Affected', field: 'TSMTIMELINE_Affected' },
        { type: [ 'sumColumn' ], headerName: 'Failed', field: 'TSMTIMELINE_Failed' },
        { type: [ 'sumColumn' ], headerName: 'Bytes', field: 'TSMTIMELINE_Bytes' },
        { type: [ 'sumColumn' ], headerName: 'Idle', field: 'TSMTIMELINE_Idle' },
        { type: [ 'sumColumn' ], headerName: 'Media Wait', field: 'TSMTIMELINE_Mediaw' },
        { type: [ 'sumColumn' ], headerName: 'Processes', field: 'TSMTIMELINE_Processes' },
        { type: [ 'sumColumn' ], headerName: 'Completion Code', field: 'TSMTIMELINE_Completion_code' },
        { type: [ 'sumColumn' ], headerName: 'Comm Wait', field: 'TSMTIMELINE_Comm_wait' },
        { type: [ 'sumColumn' ], headerName: 'Protected', field: 'TSMTIMELINE_Bytes_protected' },
        { type: [ 'sumColumn' ], headerName: 'Written', field: 'TSMTIMELINE_Bytes_written' },
        { type: [ 'sumColumn' ], headerName: 'Dedup Savings', field: 'TSMTIMELINE_Dedup_savings' },
        { type: [ 'sumColumn' ], headerName: 'Compression Savings', field: 'TSMTIMELINE_Comp_savings' },
        { type: [ 'maxColumn' ], headerName: 'Details', field: 'CfgTsmTimelineActivity_details' },
        { type: [ 'maxColumn' ], headerName: 'Type', field: 'CfgTsmTimelineActivity_type' },
        { type: [ 'maxColumn' ], headerName: 'Number', field: 'CfgTsmTimelineNumber' },
        { type: [ 'maxColumn' ], headerName: 'As Entity', field: 'CfgTsmTimelineAs_entity' },
        { type: [ 'maxColumn' ], headerName: 'Sub Entity', field: 'CfgTsmTimelineSub_entity' },
        { type: [ 'maxColumn' ], headerName: 'Comm Method', field: 'CfgTsmTimelineCommmeth' },
        { type: [ 'maxColumn' ], headerName: 'Address', field: 'CfgTsmTimelineAddress' },
        { type: [ 'maxColumn' ], headerName: 'Schedule Name', field: 'CfgTsmTimelineSchedule_name' },
        { type: [ 'maxColumn' ], headerName: 'Successful', field: 'CfgTsmTimelineSuccessful' },
        { type: [ 'maxColumn' ], headerName: 'Volumne', field: 'CfgTsmTimelineVolume_name' },
        { type: [ 'maxColumn' ], headerName: 'Drive', field: 'CfgTsmTimelineDrive_name' },
        { type: [ 'maxColumn' ], headerName: 'Library', field: 'CfgTsmTimelineLibrary_name' },
        { type: [ 'maxColumn' ], headerName: 'Last Use', field: 'CfgTsmTimelineLast_use' },
        { type: [ 'maxColumn' ], headerName: 'Offsite Volumes', field: 'CfgTsmTimelineNum_offsite_vols' },
        { type: [ 'maxColumn' ], headerName: 'Instance', field: 'CfgTsmTimelineInstance' },
        { type: [ 'maxColumn' ], headerName: 'Node', field: 'CfgTsmTimelineNodeName' }
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