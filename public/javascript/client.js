import './ag-grid-community.js';
import './ag-grid-enterprise.js';

var typeFilter = {
  buttons: [ 'reset', 'apply' ],
  values: function (params) {
    fetch('/types')
      .then(response => response.json())
      .then((o) => {
        let vals = o.rows.map( r => r.type );
        params.success(vals);
    })
  },
};

var tsmActivityFilter = {
  buttons: [ 'reset', 'apply' ],
  values: function (params) {
    fetch('/tsmactivity')
      .then(response => response.json())
      .then((o) => {
        let vals = o.rows.map( r => r.activity );
        params.success(vals);
    })
  },
};

var tsmEntityFilter = {
  buttons: [ 'reset', 'apply' ],
  values: function (params) {
    fetch('/tsmentity')
      .then(response => response.json())
      .then((o) => {
        let vals = o.rows.map( r => r.entity );
        params.success(vals);
    })
  },
};

var tagFilter = {
  buttons: [ 'reset', 'apply' ],
  values: function (params) {
    fetch('/tags')
      .then(response => response.json())
      .then((o) => {
        let vals = o.rows.map( r => r.tags );
        params.success(vals);
    })
  },
};

var dateFilter = {
  buttons: [ 'reset', 'apply' ],
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  minValidYear: 2000,
  filterOptions: [ 
    // 'equals',
    'inRange',
    'greaterThan',
    'lessThan'
  ]
};

var nameFilter = {
  buttons: [ 'reset', 'apply' ],
  values: function (params) {
    fetch('/names')
      .then(response => response.json())
      .then((o) => {
        let vals = o.rows.map( r => r.name );
        params.success(vals);
    })
  },
};

// autosize all columns
function autosizeAllColumns() {
  let allColIds = gridOptions.columnApi.getAllColumns().map( c => c.colId );
  gridOptions.columnApi.autoSizeAllColumns(allColIds);
}

// Call every time the quick filter is updated to narrow the page.
function bob() {
  val = document.querySelector("#quick-filter").value;
  gridOptions.api.setQuickFilter(val);
}

const tsmColumnDefs = [
  {
    headerName: "Configuration",
    children: [
      {
        headerName: "Date/Time",
        field: "poll_ts",
        filter: "agDateColumnFilter",
        filterParams: dateFilter,
        type: ["config"],
      },
      {
        headerName: "Year",
        hide: true,
        field: "toStartOfYear(poll_ts)",
        type: ["config"],
      },
      {
        headerName: "Month",
        hide: true,
        field: "toStartOfMonth(poll_ts)",
        type: ["config"],
      },
      {
        headerName: "Day",
        hide: true,
        field: "toStartOfDay(poll_ts)",
        type: ["config"],
      },
      {
        headerName: "Activity",
        field: "CfgTsmTimelineActivity",
        rowGroup: true,
        filter: true,
        filterParams: tsmActivityFilter,
        type: ["config"],
      },
      {
        headerName: "Entity",
        field: "CfgTsmTimelineEntity",
        filter: true,
        filterParams: tsmEntityFilter,
        type: ["config"],
      },
      {
        headerName: "Details",
        field: "CfgTsmTimelineActivity_details",
        type: ["config"],
      },
      {
        headerName: "Type",
        field: "CfgTsmTimelineActivity_type",
        type: ["config"],
      },
      { headerName: "Number", field: "CfgTsmTimelineNumber", type: ["config"] },
      {
        headerName: "As Node",
        field: "CfgTsmTimelineAs_entity",
        type: ["config"],
      },
      {
        headerName: "Sub Entity",
        field: "CfgTsmTimelineSub_entity",
        type: ["config"],
      },
      {
        headerName: "Comm Method",
        field: "CfgTsmTimelineCommmeth",
        type: ["config"],
      },
      {
        headerName: "Address",
        field: "CfgTsmTimelineAddress",
        type: ["config"],
      },
      {
        headerName: "Schedule",
        field: "CfgTsmTimelineSchedule_name",
        type: ["config"],
      },
      {
        headerName: "Successful",
        field: "CfgTsmTimelineSuccessful",
        type: ["config"],
      },
      {
        headerName: "Volume",
        field: "CfgTsmTimelineVolume_name",
        type: ["config"],
      },
      {
        headerName: "Drive",
        field: "CfgTsmTimelineDrive_name",
        type: ["config"],
      },
      {
        headerName: "Library",
        field: "CfgTsmTimelineLibrary_name",
        type: ["config"],
      },
      {
        headerName: "Last Used",
        field: "CfgTsmTimelineLast_use",
        type: ["config"],
      },
      {
        headerName: "Offsite Volumes",
        field: "CfgTsmTimelineNum_offsite_vols",
        type: ["config"],
      },
      { headerName: "Node", field: "CfgTsmTimelineNodeName", type: ["config"] },
      {
        headerName: "Instance",
        field: "CfgTsmTimelineInstance",
        type: ["config"],
      },
    ],
  },
  {
    headerName: "Trend",
    children: [
      {
        headerName: "Examined",
        field: "TSMTIMELINE_Examined",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Bytes",
        field: "TSMTIMELINE_Bytes",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Affected",
        field: "TSMTIMELINE_Affected",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Failed",
        field: "TSMTIMELINE_Failed",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Idle",
        field: "TSMTIMELINE_Idle",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Media Wait",
        field: "TSMTIMELINE_Mediaw",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Processes",
        field: "TSMTIMELINE_Processes",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Completion Code",
        field: "TSMTIMELINE_Completion_code",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Comm Wait",
        field: "TSMTIMELINE_Comm_wait",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Bytes Protected",
        field: "TSMTIMELINE_Bytes_protected",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Bytes Written",
        field: "TSMTIMELINE_Bytes_written",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Dedupe Savings",
        field: "TSMTIMELINE_Dedup_savings",
        type: ["trend", "rightAligned"],
      },
      {
        headerName: "Compression Savings",
        field: "TSMTIMELINE_Comp_savings",
        type: ["trend", "rightAligned"],
      },
    ],
  },
];

const tsmDatasource = {
  getRows(params) {
    fetch("/gpeTsmTimeline/", {
      method: "post",
      body: JSON.stringify(params.request),
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        console.log(response)
        params.successCallback(response.rows, response.lastRow);
      })
      .catch((error) => {
        console.error(error);
        params.failCallback();
      });
  },
};

const itemColumnDefs = [
  { headerName: "Date/Time", field: "last_trend_ts", hide: true, enableRowGroup: false, sort: 'asc', filter: 'agDateColumnFilter', filterParams: dateFilter },
  { headerName: "Year", field: "toStartOfYear(last_trend_ts)", enableRowGroup: true },
  { headerName: "Month", field: "toStartOfMonth(last_trend_ts)", enableRowGroup: true },
  { headerName: "Day", field: "toStartOfDay(last_trend_ts)", enableRowGroup: true },
  { headerName: "Hour", field: "toStartOfHour(last_trend_ts)", enableRowGroup: true },
  // { headerName: "Tags", field: "toString(tags)", enableRowGroup: true, filter: true, filterParams: tagFilter },
  { headerName: "Type", field: "type", enableRowGroup: true, filter: true, filterParams: typeFilter },
  // { headerName: "Name", field: "name", enableRowGroup: true, filter: true, filterParams: nameFilter },
  // { headerName: "ID", field: "item_id", enableRowGroup: true, type: "rightAligned" },
  { headerName: "Items", field: "key", aggFunc: "count", valueFormatter: "numberCellFormatter", type: "rightAligned", hide: false, sortable: true }, 
  { headerName: "File", field: "file_key", aggFunc: "max", hide: false, sortable: true }, 
  { headerName: "File", field: "file_key", aggFunc: "max", hide: false, sortable: true }, 
];

const itemDatasource = {
  getRows(params) {
    console.log(JSON.stringify(params.request, null, 1));

    fetch("/gpeItems/", {
      method: "post",
      body: JSON.stringify(params.request),
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        params.successCallback(response.rows, response.lastRow);
      })
      .catch((error) => {
        console.error(error);
        params.failCallback();
      });
  },
};

var gpeDatasource = tsmDatasource;
var gpeColumns = tsmColumnDefs;
// var gpeDatasource = itemDatasource;
// var gpeColumns = itemColumnDefs;

const gridOptions = {
  rowModelType: "serverSide",
  showOpenedGroup: true,
  animateRows: true,
  enableCharts: true,
  rowHeight: 35,
  enableRangeSelection: true,
  sideBar: {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
        }
    ],
    position: 'left',
    defaultToolPanel: 'columns'
  },
  groupMultiAutoColumn: false,
  groupUseEntireRow: true,

  columnDefs: gpeColumns,

  statusBar: {
    statusPanels: [
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ],
  },

  rowGroupPanelShow: true,

  defaultColDef: {
    // filter: true,
    sortable: true,
    hide: false,
    resizable: true
  },

  columnTypes: {
    config: {
      enableRowGroup: true,
      enableValue: true,
      enableSort: true
    },
    trend: {
      enableRowGroup: false,
      enableValue: true,
      enableSort: true,
      filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: [ 'reset', 'apply' ],
      },
      width: 150
      // valueFormatter: commaSeparateNumber
    }
  },

  debug: true,

  cacheBlockSize: 250,
  // maxBlocksInCache: 3,
  // purgeClosedRowNodes: true,
  // maxConcurrentDatasourceRequests: 2,
  // blockLoadDebounceMillis: 1000
};

const gridDiv = document.querySelector("#myGrid");
new agGrid.Grid(gridDiv, gridOptions);

gridOptions.api.setServerSideDatasource(gpeDatasource);
// autosizeAllColumns();

function commaSeparateNumber(params) {
  let val = params.value;
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }
  return val;
}
