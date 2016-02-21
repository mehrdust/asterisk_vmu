<?php

//error_reporting(~0); ini_set('display_errors', 1);
    include 'config.php';
    include "func-utils.php";

    /*********************
     * Parameter Checking
     ********************/
    $loginUsername = isset($_POST["loginUsername"]) ? $_POST["loginUsername"] : "*";
    $loginPassword = isset($_POST["loginPassword"]) ? $_POST["loginPassword"] : "*";

    if (!$loginUsername || !$loginPassword) exitNow("Cannot Login at the moment");
    $keepAlive = ($_POST["keepAlive"] === 'on') ? 'on' : 'off';

    /*************************
     * Datasource Connection
     ************************/

    try {
        $conn = new PDO("mysql:host=".DBSERVER.";dbname=".DBASE, DBUSER, DBPSW);
        
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $qry = 'SELECT user_login, user_fullname FROM vru_user
                WHERE user_login = :user AND user_password = SHA1(:pass) LIMIT 1';
//        print_r($qry);
        $data = $conn->prepare($qry);
        $data->execute(array(
            'user' => $loginUsername,
            'pass' => $loginPassword
        ));
//        print_r($data);
        $res = $data->fetchAll();
		
        if (count($res) > 0) {
            date_default_timezone_set('Asia/Kuala_Lumpur');
            $last = date('Y-m-d H:i:s');
            $result["success"] = true;
            $result["last"] = $last;

            session_start();
            $_SESSION['user_name'] = $res[0]['user_login'];
            $_SESSION['user_fullname'] = $res[0]['user_fullname'];
            $_SESSION['user_last_activity'] = $last;
            $_SESSION['keep_alive'] = $keepAlive;
        } else {
            $result["success"] = false;
            $result["errors"]["reason"] = "Login failed. Try again.";
        }
    }
    catch (PDOException $e) {
//        echo 'ERROR: ' . $e->getMessage();
        exitNow("DB ERROR");
    }
//echo DBSERVER."|".DBUSER."|".DBPSW."|".DBASE;
    echo json_encode($result);
    
    exit(0);

?>