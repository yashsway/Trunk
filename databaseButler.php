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
        $result = $fet->itemFetch($_POST['category']);
        echo json_encode($result);
    }
    function fetchCats(){
        def();
        $cat = new Db();
        $result = $cat->catsFetch();
        echo json_encode($result);
    }
    if((isset($_REQUEST['reqType']))==1){
        if($_REQUEST['reqType']==0){
            fetchItems();
        }else if($_REQUEST['reqType']==1){
            fetchCats();
        }
    }
?>
