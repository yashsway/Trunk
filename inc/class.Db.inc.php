<?php
class Db {
    public $databaseConnection;
    //Database Settings
    public $database = 'pigeon';
    public $servAddress = 'localhost';
    public $user = 'root';
    public $pass = '';

    public function __construct(){
        $this->databaseConnect();
    }
    public function databaseConnect(){
        global $database;
        global $servAddress;
        global $user;
        global $pass;

        if($GLOBALS['appMode']==0){
            //Connection to test database
            $this->databaseConnection = mysqli_connect($servAddress,$user,$pass);
        }else if($GLOBALS['appMode']==1){
            //Production database
            $this->databaseConnection = mysqli_connect("0.0.0.0", "mightyrevenge", "", "trunk", "3306");
        }
    }

    public function fetchName(){
        $id = 1;
        $ajaxQuery = $this->databaseConnection->prepare('SELECT name FROM test WHERE id = ?');
        $ajaxQuery->bind_param("i",$id);
        $ajaxQuery->execute();

        if(!$ajaxQuery){
             return false;
        }

        $ajaxQuery->bind_result($na);
        while($ajaxQuery->fetch()){
             $assoc_result[0]['name'] = $na;
        }

        return $assoc_result;
    }
}
?>
