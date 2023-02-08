<?php
     ini_set('display_errors', 1);
     ini_set('display_startup_errors', 1);
     error_reporting(E_ALL);
    
     
     
    
    
    require "./DB/db.php";

    //Get URL
    $URL = $_SERVER['REQUEST_URI'];
   
    $splitURL = explode("/",strtolower($URL));
    //Get Method
    
    $method = $_SERVER["REQUEST_METHOD"];

    if($splitURL[3] == "missions" && $method == "GET" ){

        //Get all Missions
        $getquery = "SELECT * FROM missions";
        $conn = (new DBConn())->database();
        $result = $conn->query($getquery);
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    
    }elseif($splitURL[3] == "newmission" && $method == "POST" ){
        $_POST = json_decode(file_get_contents('php://input'), true);

        //Create New Mission
        if (empty($_POST["missionName"]) || empty($_POST["dueDate"])){
            http_response_code(400);
            echo '{error: "Non valid parameters"}';
            die();
        }
        $sql = "INSERT INTO missions (`missionName`, `missionStatus`, `dueDate`, `lastUpdate`) 
        VALUES ( '" . $_POST["missionName"] . "', 'active', '" . $_POST["dueDate"]. "', now())";
    
    }elseif($splitURL[3] == "updatemission" && $method == "POST" ){
        $_POST = json_decode(file_get_contents('php://input'), true);
        //Update Mission info
        if (empty($_POST["missionName"]) || empty($_POST["id"]) || empty($_POST["dueDate"])){
            http_response_code(400);
            echo '{error: "Non valid parameters"}';
            die();
        }
        $sql = "UPDATE missions SET `missionName`= '" . $_POST["missionName"] . "', `dueDate` = '"
        . $_POST["dueDate"] . "', `lastUpdate` = now() WHERE `id`='" . $_POST['id'] ."'";
    
    }elseif($splitURL[3] == "missionstatus" && $method == "POST" ){
        $_POST = json_decode(file_get_contents('php://input'), true);
        //Update Mission status
        if (empty($_POST["missionStatus"]) || empty($_POST["id"])){
            http_response_code(400);
            echo '{error: "Non valid parameters"}';
            die();
        }        
        $sql = "UPDATE missions SET `missionStatus`= '" . $_POST["missionStatus"] . "' WHERE `id`='"
        . $_POST['id'] ."'";
    
    
    }elseif($splitURL[3] == "missiondelete" && $method == "POST" ){
        $_POST = json_decode(file_get_contents('php://input'), true);
        //Delete Mission
        if (empty($_POST["id"])){
            http_response_code(400);
            echo '{error: "Non valid parameters"}';
            die();
        }        
        $sql = "DELETE FROM missions WHERE id = '" . $_POST['id']  . "' LIMIT 1";
    
    }else{
        http_response_code(400);
        echo '{error: "not a valid request"}';
        die();
    }
    

    if(isset($sql)){
        $conn = (new DBConn())->database();
        $result = $conn->query($sql);
        if($result){
            http_response_code(200);
            echo '{success : "success", data : ' . $result .'}';
            die();
        }else{
            http_response_code(500);
            echo '{error: "Internal Communication error"}';
            die();
        }
    }

    