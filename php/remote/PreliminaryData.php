<?php
    include 'config.php';
    include "func-utils.php";
    
/*********************
* Parameter Checking
********************/
    $qryType = isset($_GET["qryType"]) ? $_GET["qryType"] : "*";
    if ($qryType === '*') exitNow ('Query type not specified.');
    
    switch ($qryType) {
        case 'agent':
            $qry = 'SELECT * from agents_view WHERE agent_id > 1 ORDER by agent_id ';
            break;
        case 'queue':
            $qry = 'SELECT * from queues_view WHERE queue_id > 1 ORDER BY queue_id';
            break;
    }
        
    $res = getData($qry);
    
    echo json_encode($res);
?>