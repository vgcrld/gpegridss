# GPE Grid Server-Side (gpegridss) Node.js Example

## Originally Copied Fron ag-Grid Sample

This was copied from the ag-Grid site as a starting point and modified to access clickhouse and eventually remove webpack.

A reference implementation showing how to perform server-side operations using ag-Grid with node.js and MySQL.

For full details see: http://ag-grid.com/nodejs-server-side-operations/

The repo is here: git clone https://github.com/ag-grid/ag-grid-server-side-nodejs-example.git


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
