<?php
    session_start();
//    print_r($_SESSION);
    $session['user_name'] = isset($_SESSION['user_name']) ? $_SESSION['user_name'] : "0";
    $session['user_fullname'] = isset($_SESSION['user_fullname']) ? $_SESSION['user_fullname'] : "0";
    $session['user_last_activity'] = isset($_SESSION['user_last_activity']) ? $_SESSION['user_last_activity'] : "0";
    $session['keep_alive'] = isset($_SESSION['keep_alive']) ? $_SESSION['keep_alive'] : "off";
    echo json_encode($session);

    date_default_timezone_set('Asia/Kuala_Lumpur');
    $_SESSION['user_last_activity'] = date('Y-m-d H:i:s');
?>
