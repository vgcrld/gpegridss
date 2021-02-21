import { Grid } from "ag-grid-community";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

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

// Call every time the quick filter is updated to narrow the page.
function bob() {
  val = document.querySelector("#quick-filter").value;
  gridOptions.api.setQuickFilter(val);
}

const tsmColumnDefs = [
  { headerName: "Activity", field: "CfgTsmTimelineActivity", rowGroup: true },
  {
    headerName: "Year",
    field: "toYear(toStartOfYear(poll_ts))",
    rowGroup: true,
  },
  {
    headerName: "Month",
    field: "toMonth(toStartOfMonth(poll_ts))",
    rowGroup: true,
  },
  {
    headerName: "Day",
    field: "toDayOfMonth(toStartOfDay(poll_ts))",
    rowGroup: true,
  },
  { headerName: "Entity", field: "CfgTsmTimelineEntity", aggFunc: "max" },
  {
    headerName: "Bytes",
    field: "TSMTIMELINE_Examined",
    aggFunc: "max",
    valueFormatter: commaSeparateNumber,
  },
  {
    headerName: "Bytes",
    field: "TSMTIMELINE_Affected",
    aggFunc: "max",
    valueFormatter: commaSeparateNumber,
  },
  {
    headerName: "Bytes",
    field: "TSMTIMELINE_Failed",
    aggFunc: "max",
    valueFormatter: commaSeparateNumber,
  },
  {
    headerName: "Bytes",
    field: "TSMTIMELINE_Idle",
    aggFunc: "max",
    valueFormatter: commaSeparateNumber,
  },
];

const tsmDatasource = {
  getRows(params) {
    console.log(JSON.stringify(params.request, null, 1));

    fetch("./gpeTsmTimeline/", {
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

const itemColumnDefs = [
  { headerName: "Date/Time", field: "last_trend_ts", hide: true, rowGroup: false, sort: 'asc', filter: 'agDateColumnFilter', filterParams: dateFilter },
  { headerName: "Year", field: "toStartOfYear(last_trend_ts)", rowGroup: true },
  { headerName: "Month", field: "toStartOfMonth(last_trend_ts)", rowGroup: true },
  { headerName: "Day", field: "toStartOfDay(last_trend_ts)", rowGroup: true },
  { headerName: "Hour", field: "toStartOfHour(last_trend_ts)", rowGroup: true },
  // { headerName: "Tags", field: "toString(tags)", rowGroup: true, filter: true, filterParams: tagFilter },
  { headerName: "Type", field: "type", rowGroup: true, filter: true, filterParams: typeFilter },
  // { headerName: "Name", field: "name", rowGroup: true, filter: true, filterParams: nameFilter },
  // { headerName: "ID", field: "item_id", rowGroup: true, type: "rightAligned" },
  { headerName: "Items", field: "key", aggFunc: "count", valueFormatter: "numberCellFormatter", type: "rightAligned", hide: false, sortable: true }, 
  { headerName: "File", field: "file_key", aggFunc: "max", hide: false, sortable: true }, 
  { headerName: "File", field: "file_key", aggFunc: "max", hide: false, sortable: true }, 
];

const itemDatasource = {
  getRows(params) {
    console.log(JSON.stringify(params.request, null, 1));

    fetch("./gpeItems/", {
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

// var gpeDatasource = tsmDatasource;
// var gpeColumns = tsmColumnDefs;
var gpeDatasource = itemDatasource;
var gpeColumns = itemColumnDefs;

const gridOptions = {
  rowModelType: "serverSide",
  serverSideStoreType: 'full',
  animateRows: true,
  enableCharts: true,
  grouping: true,
  rowHeight: 35,
  enableRangeSelection: true,
  sideBar: true,
  enablePivotMode: true,
  groupSelectsChildren: true,
  groupMultiAutoColumn: true,
  groupUseEntireRow: true,
  showOpenedGroup: true,

  columnDefs: gpeColumns,

  defaultColDef: {
    // filter: true,
    // sortable: true,
    hide: true,
    resizable: true,
  },

  debug: true,

  cacheBlockSize: 200,
  // maxBlocksInCache: 3,
  // purgeClosedRowNodes: true,
  // maxConcurrentDatasourceRequests: 2,
  // blockLoadDebounceMillis: 1000
};

const gridDiv = document.querySelector("#myGrid");
new Grid(gridDiv, gridOptions);

gridOptions.api.setServerSideDatasource(gpeDatasource);

function commaSeparateNumber(params) {
  let val = params.value;
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }
  return val;
}
