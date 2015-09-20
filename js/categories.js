var newrating;
var selectedCat;
$(document).ready(function(){
  init();
  createBindings();
});
var init = function(){
    var request = {reqType:1};
    ajaxRequest("databaseButler.php","json",request,function(cats){
    //var cats = ['books','movies','shows','bars','food','books','movies','shows','bars','food','books','movies','shows','bars','food','books','movies','shows','bars','food'];//data.cats;
    for (var i = 0; i < cats.length; i++) {

        $('#container').append('<div class="item i' + ((i % 4) + 1) + '" data-id="' + cats[i].name  + '"><img class="category-icons" src="assets/icons/'+cats[i].name+'.png"></div>');
    }
    resizeItems(getOptimalRows());
    
    $('.item').on('mousedown',function() {
    $(".item").on('mouseup touchend',function(){
      $("#container").slideUp(500,function(){
        $("#view2").show();
      });
      selectedCat = $(this).data('id');
      console.log(selectedCat);
      // var load = function(){
      ajaxRequest("databaseButler.php","json",{reqType:0, id: $(this).data('id')},function(data){
        console.log(data);
        if (data != null){
        for (var i = 0; i<data.length; i++){
          var starsDone = data[i].rating;
          var starsEl = "";
          for (var j = 1; j <= 5; j++ ){
            if (starsDone > 0){
              console.log("Black star");
              starsEl += '<span class="star">&#9733;</span>';
              starsDone--;
            }else{
              starsEl += '<span class="star">&#9734;</span>';
            }
          }
          $('.items').append('<li class="list-item i' + ((i % 4) + 1) + '" data-desc="' + data[i].description + '"><span class="itemLabel">' + data[i].label + '</span><div class="starCont startCont2">' + starsEl + ' </div></li>');
        }
        }
        $('span.star').hover(
        function(){
          if ($(this).parent().data('done') != true){
            $(this).prevAll("span.star").andSelf().text('\u2605');
          }
        },
        function(){
          if ($(this).parent().data('done') != true){
            $(this).prevAll("span.star").andSelf().text('\u2606');
          }
        }
    );
      $('span.star').on('click touchend',function(){
        if ($(this).parent().data('done') != true){
          $(this).prevAll("span.star").andSelf().text('\u2605');
          $(this).parent().data('done',true);
          newrating = $(this).prevAll("span.star").andSelf().length;
        }else{
          $(this).prevAll("span.star").andSelf().text('\u2606');
          $(this).parent().data('done',false);
          newrating = 0;
        }
        console.log(newrating);
      });
      $('.list-item').click(function() {
        $('.desc').remove();
         $(this).after('<div class="desc">'+ $(this).data('desc') + '</div>'); 
      });
      });
      // };
      // load();
    });
    });
    
    var $container = $('#container').packery();
    // init
    $container.packery({
      itemSelector: '.item',
      gutter: 10
    });
    $container.packery('bindResize');
    // $container.find('.item').each( function( i, itemElem ) {
    //   // make element draggable with Draggabilly
    //   var draggie = new Draggabilly( itemElem );
    //   // bind Draggabilly events to Packery
    //   $container.packery( 'bindDraggabillyEvents', draggie );
    // });
  });
};
var createBindings = function(){
  $(window).resize(function(){
    resizeItems(getOptimalRows());
  });
  $('.subbtn').click(function() {
     var newItem = {name: $('#exampleInputEmail1').val(),rating: newrating,description: $('.subdesc').val(),id: selectedCat}; 
     console.log(newItem);
     ajaxRequest("databaseButler.php","text",{reqType:2, name: $('#exampleInputEmail1').val(),rating: newrating,description: $('.subdesc').val(),id: selectedCat},function(data){
       console.log(data);
     });
  });
};
var resizeItems = function(perRow){
  var size = ($('#container').width() - 10*perRow)/perRow;
  $('.item').width(size);
  $('.item').height(size);
};

var getOptimalRows = function(){
  var contWidth = $('#container').width();
  if (contWidth > 1068){
    return 6;
  }else if(contWidth <= 1068 && contWidth > 980){
    return 5;
  }else if(contWidth <= 980 && contWidth > 620){
    return 4;
  }else if (contWidth <= 620 && contWidth > 460){
    return 3;
  }else if (contWidth <= 460 && contWidth > 300){
    return 2;
  }
};