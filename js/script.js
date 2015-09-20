//--------------------AJAX Handler-------------------
var data = "";

function ajaxRequest(reqScript, returnDataType, reqData, callback) {
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
        fail: function() {
            console.log("AJAX request failed.");
        },
        error: function() {
            console.log("Error on server-side!");
        }
    });
}
//Page load
$(document).ready(function() {
    //Packery initialize
    var $container = $('#main-panel').packery();
    // init
    $container.packery({
        itemSelector: '.item',
        gutter: 10
    });

    $container.find('.item').each(function(i, itemElem) {
        // make element draggable with Draggabilly
        var draggie = new Draggabilly(itemElem);
        // bind Draggabilly events to Packery
        $container.packery('bindDraggabillyEvents', draggie);
    });
    
    $('#button').click(function(){
        if ($('.new-form').hasClass('slide-down')){
             $('.items').slideUp("medium", function(){
                $('.new-form').removeClass('slide-down');
                $('.new-form').show({complete: function(){
                    $('.new-form').addClass('slide-up', 1000, 'easeOutBounce');
                }});
             });
        $('span.button-txt').fadeTo(10, 0, function(){
            $(this).delay(500);
            $(this).html("x");
            $(this).fadeTo(10, 1);
        });
        }
        else {
            $('.items').slideDown("medium", function(){
                $('.new-form').removeClass('slide-up');
                $('.new-form').addClass('slide-down', 1000, 'easeOutBounce');
             });
        $('span.button-txt').fadeTo(10, 0, function(){
            $(this).delay(500);
            $(this).html("+");
            $(this).fadeTo(10, 1);
        
         });
        }
    });
});