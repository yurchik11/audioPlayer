var audio;

$('#pause').hide();

initAudio($('#play-list li:first-child'));

function initAudio(element){
    var song = element.attr('song');
    var title = element.text();
    var artist = element.attr('artist');

    audio = new Audio('media/' + title+".mp3");

    if(!audio.currentTime){
        $('#duration').html('0:00');
    }

    $('#audio-player .title').text(song);
    $('#audio-player .artist').text(artist);

    $('#play-list li').removeClass('active');
    element.addClass('active');
}


$('#play').click(function(){
    audio.play();
    audio.volume=parseFloat($('#volume').val()/200);
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});

$('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});


$('#stop').click(function(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('#duration').fadeOut(400);
});

$('#next').click(function(){
    audio.pause();
    var next = $('#play-list li.active').next();
    if (next.length == 0) {
        next = $('#play-list li:first-child');
    }
    initAudio(next);
    audio.play();
    showDuration();
});

$('#prev').click(function(){
    audio.pause();
    var prev = $('#play-list li.active').prev();
    if (prev.length == 0) {
        prev = $('#play-list li:last-child');
    }
    initAudio(prev);
    audio.play();
    showDuration();
});

$('#play-list li').click(function () {
    audio.pause();
    initAudio($(this));
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    audio.play();
    showDuration();
});


$('#volume').change(function(){
    audio.volume = parseFloat(this.value / 200);
    //console.log(parseFloat(this.value / 200));
});

function showDuration(){
    $(audio).bind('timeupdate', function(){
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt((audio.currentTime / 60) % 60);
        if (s < 10) {
            s = '0' + s;
        }
        $('#duration').html(m + ':' + s);
        var value = 0;
        if (audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        $('.progress-bar').css('width',value+'%');
        $('#label-bar').text(value+'%');
        if(value==100)
            $('#next').click();
    });
}

$('#my-progress').click(function(e) {
    var posX = e.pageX -  $(this).offset().left;
    var posXinRate = posX/$('#my-progress')[0].clientWidth;
    audio.currentTime = parseFloat(posXinRate)*audio.duration;
    //console.log(posXinRate);
});

