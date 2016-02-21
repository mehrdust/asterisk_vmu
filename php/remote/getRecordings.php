<?php

    include 'config.php';
    include "func-utils.php";

    $table = 'reservation_list';
    $where = " `event` IN ('COMPLETECALLER','COMPLETEAGENT') ";
    $cond = "";
/*********************
* Parameter Checking
********************/
    // SET PAGING 
    $page  = isset($_GET["page"])  ? $_GET["page"]  : "1";
    $start = isset($_GET["start"]) ? $_GET["start"] : "0";
    $limit = isset($_GET["limit"]) ? $_GET["limit"] : "50";
    // Select Condition
    $cond .= isset($_GET["clid"]) && $_GET["clid"] !== '' && $_GET["clid"] !== "undefined"? " AND clid LIKE '%".$_GET["clid"]."%'" : "";
    $cond .= isset($_GET["uniqueid"]) && $_GET["uniqueid"] !== '' && $_GET["uniqueid"] !== "undefined"? " AND queue_stats_mv.uniqueid LIKE '%".$_GET["uniqueid"]."%'" : "";
    $cond .= isset($_GET["incidentid"]) && $_GET["incidentid"] !== '' && $_GET["incidentid"] !== "undefined"? " AND incidentid LIKE '%".$_GET["incidentid"]."%'" : "";
    $cond .= isset($_GET["agents"]) && $_GET["agents"] !== '' && $_GET["agents"] !== "()" && $_GET["agents"] !== "undefined"? " AND extension in ".$_GET["agents"] : "";
    $cond .= isset($_GET["queues"]) && $_GET["queues"] !== '' && $_GET["queues"] !== "()" && $_GET["queues"] !== "undefined"? " AND queue in ".$_GET["queues"] : "";
//echo $cond;
//    $qry = "SELECT `cc_recordings_id`, `uniqueid`, `filename`, `filepath`, CONCAT('http://".DBSERVER."/', `filepath`, `filename`) As audio
//	    FROM `cc_recordings`";
    $qry = "SELECT `datetime`, `datetimeconnect`, `datetimeend`, `queue_stats_mv`.`queue`, `queue_name`, incidentid,
                    `queue_stats_mv`.`agent`, `agents_view`.extension, `agents_view`.name As agent_name, `event`, `queue_stats_mv`.`uniqueid`, `clid`, `position`, 
                    `info1`, `info2`, CONCAT('http://".DBSERVER."/', `filepath`, `filename`) As recording_audio, cc_recordings_id
            FROM `queue_stats_mv`
                LEFT JOIN `cc_recordings`
                    ON `queue_stats_mv`.`uniqueid` = `cc_recordings`.`uniqueid`
                LEFT JOIN `queues_view`
                    ON `queue_stats_mv`.`queue` = `queues_view`.queue
                LEFT JOIN `agents_view`
                    ON substr(`queue_stats_mv`.`agent`,(locate(_utf8'/',`queue_stats_mv`.`agent`) + 1)) = `agents_view`.extension
                LEFT JOIN `pg_incident_detail`
                    ON `queue_stats_mv`.`uniqueid` = `pg_incident_detail`.uniqueid
            WHERE $where $cond 
            ORDER BY datetime desc
            LIMIT $start, $limit";

//            echo $qry;
    $res = getData($qry);
//print_r($res);
    echo "{\"success\": true, \"sound_files\":". json_encode($res)."}";
//            echo json_encode($res);
?>
