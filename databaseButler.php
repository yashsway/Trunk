<?php
    function def(){
        //The following PHP code needs to be re-executed as this is a different instance
        require_once('init.php');
        require_once('functions.php');
    }
    /*function test(){
        def();
        $tst = new Db();
        $result = $tst->fetchName();
        echo json_encode($result);
    }*/
    function fetchItems(){
        def();
        $fet = new Db();
        $result = $fet->itemFetch($_POST['id']);
        echo json_encode($result);
    }
    function fetchCats(){
        def();
        $cat = new Db();
        $result = $cat->catsFetch();
        echo json_encode($result);
    }
    function newItem(){
        def();
        $nw = new Db();
        $result = $nw->itemNew($_POST['id'],$_POST['name'],$_POST['description'],$_POST['rating']);
        echo $result;
    }
    if((isset($_REQUEST['reqType']))==1){
        if($_REQUEST['reqType']==0){
            fetchItems();
        }else if($_REQUEST['reqType']==1){
            fetchCats();
        }else if($_REQUEST['reqType']==2){
            newItem();
        }
    }
?>
