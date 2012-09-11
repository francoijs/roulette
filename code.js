
$(function() {
    var _images = [
	"mysteryman.jpg",
	"028.jpg",
	"05.jpg",
	"250px-Mona_Lisa_headcrop.jpg",
	"FACES_C4.jpg",
	"JohnMcCainatDebate1.jpg",
	"Rose.jpg",
	"lamine.jpg",
	"seb.jpg",
	"steph.jpg",
	"youni-steph.png"
    ];
    var DURATION = 10000;  // ms
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
    }

    var cur;
    function roll(arg) {
	if (arg !== undefined) {
	    cur = arg;
	    console.log('start roll at '+cur);
	}
	if (cur === SAMPLES)
	    return;
	setTimeout(roll, _times[cur]);
	var top = $('#photo' + _index[cur]).position().top;
	$(window).scrollTop( top );
	cur++;
    }

    // stack images
    _images.forEach(function(f, i) {
	
	$('<img/>', 
	  { src: "visages/"+f,
	    width: $(window).height(),
	    height: $(window).height(),
	    id: 'photo'+i
	  })
	    .css('margin-left', 'auto')
	    .css('margin-right', 'auto')
	    .css('text-align', 'center')
	    .appendTo($('body'));
	$('<br>').appendTo($('body'));
    });

    // create links
    function link(fname) {
	var id = _images.indexOf(fname);
	$('<a>'+fname+'</a>').prependTo($('body'))
	    .bind('click',function(event) {
		initSamplesLoop(id);
		console.log(_times, _index);
		roll(0);
		event.preventDefault();
	    }).append($('<br>'));
    }
    
    link("seb.jpg");
    link("steph.jpg");
});
