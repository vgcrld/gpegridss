# Setup Of Clickhouse 

## Make sure the tables are refreshed (otto)

Easiest to make sure that you can access the data via table name
and not have to do any column matching.

```bash
cd ~/code/gpe-server
mygpepodgo 
bundle exec bin/create-views -e -s atsgroup
```

## Forward the port (local)

The `default-0` or `default-1` matter here. Whereever the `create-views` is run is where you need
to port forward from. 

`kubectl port-forward --namespace default svc/core-clickhouse-default-0 8123`

## Setup this alias (note the database ‘data__atsgroup’)

Use this for simple tests. Otherwise express will do the work in the app. 

```bash

# Make alias to atsgroup as 'ch'
alias ch='curl "http://127.0.0.1:8123?database=data__atsgroup" --data-binary @-'

# Make alias to Prudential as 'chp'
alias chp='curl "http://127.0.0.1:8123?database=data__Prudential" --data-binary @-'

```

## Get Data

This is a sample on how to use the `ch` alias.

`echo 'select 1 as ONE FORMAT CSVWithNames' | ch`


## Select Samples

Clickhouse does exactly what we want with buckets. It can make the buckets we need using the poll_ts:


```bash

# Get all the tables defined
echo 'show tables' | ch | less

# Some examples of getting the start of intervals from CH.
echo '
    select toStartOfInterval(poll_ts, INTERVAL 1 hour ) ts,sort_id id,CfgTsmTimelineActivity act,count(*) 
    from transient_tsmtimeline 
    group by ts, id, act 
    order by sort_id
' | ch

echo '
    select toStartOfInterval(poll_ts, INTERVAL 1 month ) ts,item_id id,count(*) 
    from trend_vmwareguest_datastore 
    group by ts, id 
    order by id
' | ch

echo '
    select toStartOfInterval(poll_ts, INTERVAL 1 month ) ts,item_id id,count(*) 
    from trend_vmwareguest_datastore 
    group by ts, id 
    order by id
' | ch

# Get all the items by year and id
echo '
    select toStartOfInterval(poll_ts, INTERVAL 1 year ) ts,item_id id,count(*) 
    from trend_vmwareguest_datastore 
    group by ts, id 
    order by id
' | ch

# Here is a list from prudential  ( pipe to chp )
echo '
    select toStartOfInterval(poll_ts, INTERVAL 1 year) ts,item_id id,count(*) 
    from trend_host 
    group by ts,id 
    order by ts,id
' | chp

# Here is a list from prudential for one ID ( pipe to chp )
echo '
    select toStartOfInterval(poll_ts, INTERVAL 1 minute) ts,item_id id,count(*) 
    from trend_host
    where item_id in (4331996,4363070)
    group by id,ts 
    order by id,ts
' | chp

# Here is a specific ID for 5 min intervals
echo '
    select toStartOfInterval(poll_ts, INTERVAL 1 hour ) ts,item_id id,count(*) 
    from trend_vmwareguest_datastore
    where item_id = 27539 
    group by ts,id
    order by ts
' | ch


```


# Other Notes about Clickhouse

## Column Comments - can we exploit these

In Clickhouse you are able to add column comments. We could use these to help document our data.

`ALTER TABLE transient_tsmtimeline COMMENT COLUMN CfgTsmTimelineNodeName 'The TSM NODE Name'`

```
        {
        "name": "CfgTsmTimelineNodeName",
        "type": "Nullable(String)",
        "default_type": "",
        "default_expression": "",
        "comment": "The TSM NODE Name",
        "codec_expression": "",
        "ttl_expression": ""
        }
```