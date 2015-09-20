$(document).ready(function(){
	resizeItems(getOptimalRows());
    var $container = $('#container').packery();
    // init
    $container.packery({
      itemSelector: '.item',
      gutter: 10
    });
    $container.packery('bindResize');
    $container.find('.item').each( function( i, itemElem ) {
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( itemElem );
      // bind Draggabilly events to Packery
      $container.packery( 'bindDraggabillyEvents', draggie );
    });
    $(window).resize(function(){
		resizeItems(getOptimalRows());
    });
});

var resizeItems = function(perRow){
	console.log("resizing: " + perRow);
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