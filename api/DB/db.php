<?php


    class DBConn
    {
        public $servername = "localhost";
        public $username = "root";
        public $password = "";
        public $dbname = "missionsDB";
        public function database()
        {
            //Connect
            $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
        
            return $conn;
        }
    }

    // CREATE TABLE `missionsdb`.`missions` ( `id` INT(15) NOT NULL AUTO_INCREMENT , `missionName` VARCHAR(60) NOT NULL , `missionStatus` INT(1) NOT NULL COMMENT '0 - active, 1- done' , `dueDate` DATE NOT NULL , `lastUpdate` DATE NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;