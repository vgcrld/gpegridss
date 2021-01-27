const { ClickHouse } = require('clickhouse');

const p = p => console.log(p);
const t = t => console.table(t);

const clickhouse = new ClickHouse({
    url: 'http://localhost',
    port: 8123,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
    format: "json",
    config: {
        session_id: 'session_id if neeed',
        session_timeout: 60,
        output_format_json_quote_64bit_integers: 0,
        enable_http_compression: 0,
        database: 'data__atsgroup',
    },

    // // This object merge with request params (see request lib docs)
    // reqParams: {
    //     ...
    // }
});


tsmLevel0 = `
    select CfgTsmTimelineActivity as activity,
        sum(TSMTIMELINE_Examined) as examined,
        sum(TSMTIMELINE_Affected) as affected,
        sum(TSMTIMELINE_Failed) as failed,
        sum(TSMTIMELINE_Bytes) as bytes,
        count(*) as Count
    FROM transient_tsmtimeline
    GROUP by activity
    LIMIT 101 OFFSET 0
`;

tsmLevel1 = `
    select CfgTsmTimelineEntity as entity,
        sum(TSMTIMELINE_Examined) as examined,
        sum(TSMTIMELINE_Affected) as affected,
        sum(TSMTIMELINE_Failed) as failed,
        sum(TSMTIMELINE_Bytes) as bytes,
        count(*) as Count
    FROM transient_tsmtimeline
    WHERE CfgTsmTimelineActivity = 'ARCHIVE'
    GROUP by entity
    LIMIT 101 OFFSET 0
`;

tsmLevel2 = `
    select CfgTsmTimelineEntity as entity, 
        TSMTIMELINE_Examined as examined,
        TSMTIMELINE_Affected as affected,
        TSMTIMELINE_Failed as failed,
        TSMTIMELINE_Bytes as bytes
    FROM transient_tsmtimeline
    WHERE CfgTsmTimelineActivity = 'ARCHIVE'
      AND CfgTsmTimelineEntity = 'GVICAIXTSM02'
    LIMIT 101 OFFSET 0
`

const r = clickhouse.query(tsmLevel2).toPromise()
    .then(res => t(res))
    .catch(err => p(err))

/* 

  {
    sort_id: 142691,
    key: 'tsm_0029f88e-57ce-5861-0299-a12ba31570f9:timeline_BACKUP-Full-GVICMGMT01-GVICMGMT01-System-State-59302',
    poll_epoch_ns: 1600727039000000000,
    insert_ts: '2020-09-21 22:41:49',
    relatives: 1,
    attributes: 15,
    poll_ts: '2020-09-21 22:23:59',
    poll_epoch: 1600727039,
    tsminstance: 142691,
    epoch_start: 1600727039,
    epoch_end: 1600727039,
    TSMTIMELINE_Examined: 0,
    TSMTIMELINE_Affected: 462,
    TSMTIMELINE_Failed: 0,
    TSMTIMELINE_Bytes: 0,
    TSMTIMELINE_Idle: 0,
    TSMTIMELINE_Mediaw: 0,
    TSMTIMELINE_Processes: 0,
    TSMTIMELINE_Completion_code: 0,
    TSMTIMELINE_Comm_wait: 0,
    TSMTIMELINE_Bytes_protected: 0,
    TSMTIMELINE_Bytes_written: 0,
    TSMTIMELINE_Dedup_savings: 0,
    TSMTIMELINE_Comp_savings: 0,
    CfgTsmTimelineActivity: 'BACKUP',
    CfgTsmTimelineActivity_details: 'SystemState',
    CfgTsmTimelineActivity_type: 'Full',
    CfgTsmTimelineNumber: '59302',
    CfgTsmTimelineEntity: 'GVICMGMT01',
    CfgTsmTimelineAs_entity: 'GVICMGMT01',
    CfgTsmTimelineSub_entity: 'System State',
    CfgTsmTimelineCommmeth: 'Tcp/Ip',
    CfgTsmTimelineAddress: 'gvicmgmt01.ats.local:52367',
    CfgTsmTimelineSchedule_name: 'INCR_1800',
    CfgTsmTimelineSuccessful: 'YES',
    CfgTsmTimelineVolume_name: '',
    CfgTsmTimelineDrive_name: '',
    CfgTsmTimelineLibrary_name: '',
    CfgTsmTimelineLast_use: '',
    CfgTsmTimelineNum_offsite_vols: '',
    CfgTsmTimelineInstance: 'TSM1500',
    CfgTsmTimelineNodeName: 'GVICMGMT01'
  }

 
  Rolled to country, sum the numerics
  select country, sum(gold) as gold, sum(silver) as silver, sum(bronze) as bronze FROM sample_data.olympic_winners  group by country limit 101 offset 0
  
  open country - Rolled to sport, where country is what was opened
  select sport, sum(gold) as gold, sum(silver) as silver, sum(bronze) as bronze FROM sample_data.olympic_winners  where country = "Russia" group by sport limit 101 offset 0


  select * FROM sample_data.olympic_winners  where country = "Russia" and sport = "Gymnastics" limit 101 offset 0

*/