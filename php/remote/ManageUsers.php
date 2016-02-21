<?php

    include 'config.php';
    include "func-utils.php";

/*********************************
 * Request Method Identification
 * GET    -> READ 
 * PUT    -> UPDATE
 * POST   -> CREATE
 * DELETE -> DESTROY
 *********************************/
    $reqMethod = $_SERVER['REQUEST_METHOD'];
//    echo $reqMethod;
/*********************
* Parameter Checking
********************/
if ($reqMethod === 'GET') {
        $page  = isset($_GET["page"]) ? $_GET["page"] : "1";
        $start = isset($_GET["start"]) ? $_GET["start"] : "0";
        $limit = isset($_GET["limit"]) ? $_GET["limit"] : "50";
        
        $totalCount = getData("SELECT COUNT(*) CNT FROM vru_user");
        if ($start > $totalCount) $start = $start - $limit;
        
    } elseif ($reqMethod === 'PUT' || $reqMethod === 'POST' || $reqMethod === 'DELETE') {
        
        $R = ParseHTTP();
        $USERS = $R['users_list'];
//        print_r($USERS);

        $vru_user_id = isset($USERS['vru_user_id']) ? $USERS['vru_user_id'] : "*";
        $user_login = isset($USERS['user_login']) ? $USERS['user_login'] : "*";
        $user_fullname = isset($USERS['user_fullname']) ? $USERS['user_fullname'] : "*";
        $user_password = isset($USERS['user_password']) ? $USERS['user_password'] : "*";
        $user_active = isset($USERS['user_active']) ? $USERS['user_active'] : "*";
        
    }

    switch ($reqMethod) {
        //****************************************** RECORD READ **********************************************
        case 'GET':
            $qry = "SELECT `user_id`, `user_login`, `user_fullname`, `user_active`, `user_active`, `user_active`
                    FROM `vru_user`
                    ORDER BY `user_id` 
                    LIMIT $start, $limit";
//            echo $qry;
            $res = getData($qry);
            
            echo "{\"success\": true, \"totalCount\": ".$totalCount[0]['CNT'].",\"users_list\":". json_encode($res)."}";
            break;
        //****************************************** RECORD UPDATE **********************************************
        case 'PUT':
            $qry = "UPDATE `vru_user` SET
                        user_login = '$user_login',
                        user_fullname = '$user_fullname',
                        user_password = SHA1('$user_password'),
                        user_active = $user_active
                    WHERE user_id = $vru_user_id";
//            echo $qry;
            $res = ManageData($qry);
            if ($res == '200') echo "{\"success\": true}";
            break;
        //****************************************** RECORD INSERT **********************************************
        case 'POST':
            $qry = "INSERT INTO vru_user
                        (
                        user_login,
                        user_fullname,
                        user_password
                        )
                    VALUES (
                        '$user_login',
                        '$user_fullname',
                        SHA1('$user_password')
                    )";
//            echo $qry;
            $res = ManageData($qry);
            if ($res == '200') echo "{\"success\": true}";
            break;
        //****************************************** RECORD DELETE **********************************************
        case 'DELETE':
            $qry = "DELETE FROM vru_user WHERE user_id = $vru_user_id";
            echo $qry;
            $res = ManageData($qry);
            if ($res == '200') echo "{\"success\": true}";
            break;
    }
?>
