# GPE Grid Server-Side (gpegridss) Node.js Example

## Originally Copied Fron ag-Grid Sample

This was copied from the ag-Grid site as a starting point and modified to access clickhouse and eventually remove webpack.

A reference implementation showing how to perform server-side operations using ag-Grid with node.js and MySQL.

For full details see: http://ag-grid.com/nodejs-server-side-operations/

The repo is here: git clone https://github.com/ag-grid/ag-grid-server-side-nodejs-example.git


## Before you Run

Before you connect to clickhouse you need to make sure that the customer you are going to browse with GPEGrid has 
run the create-views utility and then the following view is created for the transient timeline.

THIS ENTIRE EXAMPLES ASSUMES YOU ARE USING DandH AS THE SAMPLE DATABASE.

```bash
# Get into your container
mygpepodgo

# Run to create the table views 
bundle exec create-views -s DandH -e

# Connect to CH
kubectl-ch-open --database data__DandH  --context core --readonly 0
```

Once inside CH run this SQL.

```SQL
-- Run this to create the view that includes the year, month, etc splices.
drop view if exists grid_tsmtimeline

create view grid_tsmtimeline as (
select toYear(toStartOfYear(poll_ts)) year,
       toMonth(toStartOfMonth(poll_ts)) month,
       toDayOfMonth(toStartOfDay(poll_ts)) day,
       toDayOfWeek(toStartOfDay(poll_ts)) dayofweek,
       toHour(toStartOfHour(poll_ts)) hour,
       toMinute(toStartOfHour(poll_ts)) minute,
       * 
  from transient_tsmtimeline);
)
```

## Usage

```
# Clone the Repo
git clone git@github.com:vgcrld/gpegridss.git && cd gpegridss

# Get packages
npm install

# Make sure 8123 is port forwared from core to clickhouse
kubectl port-forward --namespace default svc/core-clickhouse-default-0 8123 &

# Start the app
npm run dev

```

Browse to the local server: http://localhost:4000
