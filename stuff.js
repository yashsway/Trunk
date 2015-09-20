var item1 = {name:"John", tags:"Doe", description:"lorem ipsum dolores quid quae quod..."};
var item2 = {name:"lord of the rings", tags:"Dope", description:":) ipsum dolores quid quae quod..."};
var items= [item1, item2];
$(document).ready(function(){
    //load items from database
    
    for (var i=0; i<items.length ; i++){
        var toggleNum = parseNum(i+1);
        var well = $('<div class="well"></div>');
        $('#accordion').append(well);
        var nameHolder = $('<div class="panel-heading" role="tab"></div>');
        nameHolder.attr("id","heading"+toggleNum);
        well.append(nameHolder);
        var nameStyling = $('<h4 class="panel-title"></h4>')
        var toggler = $('<a role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true"></a>');
        var aria = "collapse" + toggleNum;
        var href = "#collapse" + toggleNum;
        toggler.attr("href", href);
        toggler.attr("aria-controls", aria);
        toggler.append(items[i].name);
        nameStyling.append(toggler);
        nameStyling.append($('<div class="rating"><span class="star">&#9734;</span><span class="star">&#9734;</span><span class="star">&#9734;</span><span class="star">&#9734;</span><span class="star">&#9734;</span></div>'));
        nameHolder.append(nameStyling);
        var bodyHolder = $('<div class="panel-collapse collapse" role="tabpanel"><div class="panel-body"></div></div>');
        bodyHolder.attr("id", aria);
        bodyHolder.attr("aria-labelledby", "heading"+toggleNum);
        well.append(bodyHolder);
        var tagsHolder = $('<div class="tags"></div>')
        bodyHolder.append(tagsHolder);
        tagsHolder.append(items[i].tags);
        bodyHolder.append(items[i].description);
    }

    
    //rating star animations
    $('span.star').hover(
        function(){
            $(this).prevAll("span.star").andSelf().text('\u2605');
        },
        function(){
            $(this).prevAll("span.star").andSelf().text('\u2606');
        }
    );
    
    
    
    //new item form
    $('#button').click(function(){
        if ($('.new-form').hasClass('slide-down')){
             $('.container').slideUp("medium", function(){
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
            $('.container').slideDown("medium", function(){
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

function parseNum(i){
    var num;
    switch(i) {
    case 1:
        num = "One";
        break;
    case 2:
        num = "Two"
        break;
    case 3:
        num = "Three";
        break;
    case 4:
        num = "Four"
        break;
    case 5:
        num = "Five";
        break;
    case 6:
        num = "Six"
        break;
    default:
        num = "One";
}

return num;
    
}
        
        