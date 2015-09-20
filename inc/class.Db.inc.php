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

    /*public function fetchName(){
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
    }*/
    
    public function itemFetch($id){
        $ajaxQuery = $this->databaseConnection->prepare('SELECT * FROM items WHERE itemsKey = ?');
        $ajaxQuery->bind_param("s",$id);
        $ajaxQuery->execute();
        
        if(!$ajaxQuery){
             return false;
        }
        
        /*$ajaxQuery->bind_result($na);
        while($ajaxQuery->fetch()){
             $assoc_result[0]['name'] = $na;
        }*/
        
        $result = $ajaxQuery->get_result();
        while($row=$result->fetch_assoc()){
            $assoc_result[] = $row;
        }
        return $assoc_result;
    }
    
    public function catsFetch(){
        $ajaxQuery = $this->databaseConnection->prepare('SELECT name FROM cases');
        $ajaxQuery->execute();
 
        if(!$ajaxQuery){
             return $assoc_result[0]['error'] = 'Query fail';
        }
 
        $result = $ajaxQuery->get_result();
        while($row=$result->fetch_assoc()){
            $assoc_result[] = $row;
        }
        return $assoc_result;
    }
    
    public function itemNew($key,$lbl,$desc,$rtng){
        $ajaxQuery = $this->databaseConnection->prepare('INSERT INTO items(itemsKey, label, description, rating) VALUES (?, ?, ?, ?)');
        $ajaxQuery->bind_param("sssi",$key,$lbl,$desc,$rtng);
        $ajaxQuery->execute();
        
        if(!$ajaxQuery){
            return "Query fail";
        }else{
            return "Query pass";
        }
    }
}
?>
