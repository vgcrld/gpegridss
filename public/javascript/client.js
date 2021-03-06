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
var tsmTypeFilter = {
  buttons: [ 'reset', 'apply' ],
  values: function (params) {
    fetch('/tsmtypes')
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

const tsmColumnDefs = [
  {
    headerName: "Date Grouping",
    children: [
      {
        headerName: "Year",
        hide: true,
        field: "year",
        // rowGroup: true,
        type: ["config"],
      },
      {
        headerName: "Month",
        hide: true,
        field: "month",
        // rowGroup: true,
        type: ["config"],
        valueFormatter: formatMonthToWord,
      },
      {
        headerName: "Day",
        hide: true,
        field: "day",
        // rowGroup: true,
        type: ["config"],
      },
      {
        headerName: "Weekday",
        hide: true,
        field: "dayofweek",
        type: ["config"],
        valueFormatter: formatWeekdayToWord,
      },
      {
        headerName: "Hour",
        hide: true,
        field: "hour",
        type: ["config"],
      },
      {
        headerName: "Minute",
        hide: true,
        field: "minute",
        type: ["config"],
      },
    ],
  },
  {
    headerName: "Configuration",
    children: [
      {
        headerName: "Date/Time",
        field: "poll_ts",
        hide: false,
        filter: "agDateColumnFilter",
        filterParams: dateFilter,
        type: ["config"],
        sort: "asc",
      },
      {
        headerName: "Activity",
        field: "CfgTsmTimelineActivity",
        hide: false,
        filter: true,
        filterParams: tsmActivityFilter,
        rowGroup: true,
        type: ["config"],
      },
      {
        headerName: "Entity",
        field: "CfgTsmTimelineEntity",
        filter: true,
        hide: false,
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
        filter: true,
        filterParams: tsmTypeFilter,
      },
      { 
        headerName: "Number", 
        field: "CfgTsmTimelineNumber", 
        type: ["config"] 
      },
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
      { 
        headerName: "Node", 
        field: "CfgTsmTimelineNodeName", 
        type: ["config"] 
      },
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
        headerName: "Bytes",
        field: "TSMTIMELINE_Bytes",
        hide: false,
        type: ["trend", "rightAligned"],
        aggFunc: 'sum',
        valueFormatter: bytesFormatter,
      },
      {
        headerName: "Examined",
        field: "TSMTIMELINE_Examined",
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
        hide: false,
        valueFormatter: bytesFormatter,
      },
      {
        headerName: "Bytes Written",
        field: "TSMTIMELINE_Bytes_written",
        type: ["trend", "rightAligned"],
        hide: false,
        valueFormatter: bytesFormatter,
      },
      {
        headerName: "Dedupe Savings",
        field: "TSMTIMELINE_Dedup_savings",
        type: ["trend", "rightAligned"],
        hide: false,
        valueFormatter: bytesFormatter,
      },
      {
        headerName: "Compression Savings",
        field: "TSMTIMELINE_Comp_savings",
        type: ["trend", "rightAligned"],
        hide: false,
        valueFormatter: bytesFormatter,
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

const gridOptions = {
  pivotMode: true,
  animateRows: false,
  enableCharts: true,
  rowGroupPanelShow: 'always',
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
          //   toolPanelParams: {
          //     suppressRowGroups: true,
          //     suppressValues: false,
          // }
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
        },
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

  defaultColDef: {
    // filter: true,
    sortable: true,
    hide: false,
    resizable: true
  },

  columnTypes: {
    config: {
      allowedAggFuncs: ['count'],
      enableRowGroup: true,
      enableValue: true,
      enableSort: true,
      hide: true,
      // chartDataType: 'category'
    },
    trend: {
      allowedAggFuncs: ['min', 'max', 'count', 'sum', 'avg'],
      enableRowGroup: false,
      enableValue: true,
      enableSort: true,
      hide: true,
      filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: [ 'reset', 'apply' ],
      },
      chartDataType: 'series',
      valueFormatter: numberFormatter
    }
  },

  debug: false,

  rowModelType: 'serverSide',
  rowBuffer: 150,
  serverSideStoreType: 'partial',
  cacheBlockSize: 600,
  maxBlocksInCache: 2,
  // purgeClosedRowNodes: true,
  // maxConcurrentDatasourceRequests: 2,
  // blockLoadDebounceMillis: 1000
};

function commaSeparateNumber(params) {
  let val = params.value;
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }
  return val;
}

function getYearPart(params) {
  return params.value.split('-')[0]
}

function getDayPart(params) {
  let val = params.value.split('-')[2]
  return val.split(' ')[0]
}

function formatMonthToWord(params) {
  var val = params.value
  const dates = [
    null,
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return dates[val]
}
function formatWeekdayToWord(params) {
  var val = params.value
  const dates = [
    null,
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return dates[val]
}

function bytesFormatter(params) {
  var val = params.value
  if (val > 1024**4) {
    return round(val/1024**4) + ' TiB'
  } if (val > 1024**3) {
    return round(val/1024**3) + ' GiB'
  } if (val > 1024**2) {
    return round(val/1024**2) + ' MiB'
  } if (val > 1024**1) {
    return round(val/1024**1) + ' KiB'
  } else {
    return round(val) + ' iB'
  }
}

function numberFormatter(params) {
  var val = params.value
  if (val > 1000000) {
    debugger
  }
  return round(val,2)
}

function round(number, decimals=0) {
  const fact = Math.pow(10, decimals);
  return Math.round((number*fact)/fact)
}

const gridDiv = document.querySelector("#myGrid");
const gpegrid = new agGrid.Grid(gridDiv, gridOptions);

gridOptions.api.setServerSideDatasource(tsmDatasource);