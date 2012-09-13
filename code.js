
$(function() {
    var _images = [
	"mysteryman.jpg",
	"028.jpg",
	"05.jpg",
	"250px-Mona_Lisa_headcrop.jpg",
	"DSC00304_modified.JPG",
	"seb.jpg",
	"dylan-bob-sunglasses-9904511_modified.jpg",
	"equ 034_modified.jpg",
	"equ 252_modified.jpg",
	"FACES_C4.jpg",
	"JohnMcCainatDebate1.jpg",
	"lamine.jpg",
	"P1030021_modified.JPG",
	"Rose.jpg",
	"steph.jpg",
	"youni-steph.png",
	"obama.jpg"
    ];
    var DURATION = 5000;  // ms
    var SAMPLES = 20;

    var _index = [];
    var _times = [];
    var AVG = DURATION/SAMPLES;
    //var _times = [DURATION/SAMPLES];
    // var f = .9;
    // for (var i=0; i<SAMPLES/2; ++i) {
    // 	_times.push(AVG*(2-f));
    // 	_times.unshift(AVG*f);
    // 	f *= f;
    // }
    for (var i=0; i<SAMPLES; ++i) {
//	var f = Math.sin(Math.PI*i/SAMPLES/2);
	_times.push(AVG*2.5*i/SAMPLES); // 3*f);
    }

    function rnd(notme) {
	var n = notme;
	while (n === notme) {
	    n = 1 + Math.floor(Math.random()*(_images.length-1));
	}
	return n;
    }

    function initSamplesRandom(notme) {
	_index = [0];
	for (var i=1; i<SAMPLES-1; ++i) {
	    _index.push(rnd(notme));
	}
	_index[SAMPLES-1] = notme;
    }
    function initSamplesLoop(last) {
	var n = last;
	_index = [];
	for (var i=0; i<SAMPLES; ++i) {
	    _index.unshift(n);
	    n++;
	    if (n === _images.length)
		n = 1;
	}
	_index[0] = 0; // mystery man is 1st
    }

    var cur;
    function roll(arg) {
	if (arg !== undefined) {
	    $('img').css('opacity', 0);
	    cur = arg;
	    console.log('start roll at '+cur);
	}
	if (cur === SAMPLES) {
	    $('#photo' + _index[cur-1])
		.addClass('winner');
	    return;
	}

	var next = $('#photo' + _index[cur]);
	next.animate({ opacity: 1 },
		     _times[cur],
		     roll);
	var prev = $('#photo' + _index[cur-1]);
	prev.animate({ opacity: 0 },
		     _times[cur]
		    );
	cur++;
    
	// setTimeout(roll, _times[cur]);
	// if (cur-1 > 0)
	//     $('#photo' + _index[cur-1]).removeClass('visible')
	//     .addClass('transparent');
	// $('#photo' + _index[cur]).removeClass('transparent')
	//     .addClass('visible')
	// var top = $('#photo' + _index[cur]).position().top;
	// $(window).scrollTop( top );
    }

    // stack images
    _images.forEach(function(f, i) {

	$('<img/>', 
	  { src: "visages/"+f,
	    height: $(window).height()-12,
	    id: 'photo'+i,
	  })
	    .css('opacity', 0)
	    .load(function() {
		// center align
		$(this).css('margin-left', function(i) {
		    var w = this.width;
		    return ($(window).width()-w)/2;
		});
	    })
	    .appendTo($('#photos'));
    });

    // show mystery man image
    $('img#photo0').css('opacity', 1);

    // start
    $(document).keydown(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	console.log(keycode);

	var pho;
	switch(keycode) {
	case 66: // b
	    pho = "seb.jpg";
	    break;

	case 83: // s
	    pho = "steph.jpg";
	    break;

	case 89: // y
	    pho = "youni-steph.png";
	    break;
	    
	case 13: // ENTER = mystery man 
	    $('img').css('opacity', 0);
	    $('img#photo0').css('opacity', 1);
	}
	if (pho) {
	    var id = _images.indexOf(pho);
	    initSamplesLoop(id);
	    console.log(_times, _index);
	    roll(1);
	}
    });

    // create links
    // function link(fname) {
    // 	var id = _images.indexOf(fname);
    // 	$('<a>'+fname+'</a>').prependTo($('body'))
    // 	    .bind('click',function(event) {
    // 		initSamplesLoop(id);
    // 		console.log(_times, _index);
    // 		roll(1);
    // 		event.preventDefault();
    // 	    }).append($('<br>'));
    // }
    
    // link("seb.jpg");
    // link("steph.jpg");
});
