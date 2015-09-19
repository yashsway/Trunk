//--------------------AJAX Handler-------------------
var data = "";
function ajaxRequest(reqScript, returnDataType, reqData, callback){
    $.ajax({
        type: "POST",
        dataType: returnDataType,
        url: reqScript,
        data: reqData,
        success: function(data) {
            //console.log("AJAX request success.");
            //console.log(data);
            callback(data);
        },
        fail: function(){
            console.log("AJAX request failed.");
        },
        error: function(){
            console.log("Error on server-side!");
        }
    });
}
//Page load
$(document).ready(function(){
    var request = {reqType:0};
    ajaxRequest("databaseButler.php","json",request,function(returnedData){
        console.log(returnedData[0].name);
    });
    
    //var $container = $('#container');
    var $container = $('#container').packery();
    // init
    $container.packery({
      itemSelector: '.item',
      gutter: 10
    });
    
    $container.find('.item').each( function( i, itemElem ) {
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( itemElem );
      // bind Draggabilly events to Packery
      $container.packery( 'bindDraggabillyEvents', draggie );
    });
});
