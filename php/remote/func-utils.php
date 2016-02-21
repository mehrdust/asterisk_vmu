<?php

/*
 * Creates a valid JSON string and exits
 * name: exitNow()
 * @param: $Msg 
 * @return: JSON string with reason specified
 * 
 */
    function exitNow($Msg) {
        die("{\"success\": false, \"reason\": \"$Msg\"}");
    }
/*
 * returns the MySQL Query result
 * name: getData()
 * @param: $qry -> Mysql query statement
 * @return: array result set of the query
 * 
 */    
    function getData($qry) {
    /*************************
     * Datasource Connection
     ************************/
//        echo "$qry\n";
        try {
            $conn = new PDO("mysql:host=".DBSERVER.";dbname=".DBASE, DBUSER, DBPSW);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $data = $conn->prepare($qry);
            $data->execute();
            $res = $data->fetchAll();

        } catch (PDOException $e) {
    //        echo 'ERROR: ' . $e->getMessage();
            exitNow("DB ERROR");
        }
        return $res;
    }
/*
 * Update / Insert / Delete an item in a table
 * name: ManageData
 * @param: $qry -> Mysql query statement
 * @return: return 200 for ok or the error for failure
 * 
 */    
    function ManageData($qry, $getId=false) {
    /*************************
     * Datasource Connection
     ************************/
//        echo $qry;
        try {
            $conn = new PDO("mysql:host=".DBSERVER.";dbname=".DBASE, DBUSER, DBPSW);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $data = $conn->prepare($qry);
            $data->execute();

        } catch (PDOException $e) {
            exitNow("DB ERROR: ". $e->getMessage());
        }
        if ($getId)
            return $conn->lastInsertId();
        else
            return 200;
    }
/*
 * Parses the HTTP content and fetches the data
 * name: ManageData
 * @param: $qry -> Mysql query statement
 * @return: return 200 for ok or the error for failure
 * 
 */    
    function ParseHTTP() {
        $raw  = '';
        $httpContent = fopen('php://input', 'r');
        while ($kb = fread($httpContent, 1024)) {
            $raw .= $kb;
        }
        return json_decode(stripslashes($raw), true);
    }
    
?>
