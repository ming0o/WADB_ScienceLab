$(function() {
    function detectResize() {
        var windowWidth = window.innerWidth ;
        var windowHeight = window.innerHeight ;

        let standard = 9/16;
        let nowRatio = Number((windowHeight/windowWidth).toFixed(4));
        let imgWidth;
        let imgHeight;
        if(nowRatio < standard){
            imgWidth = (16 * windowHeight)/9;
            imgHeight = windowHeight;
            $("#door_container").css("width", imgWidth+'px');
            $("#door_container").css("height", imgHeight+'px');
            $("#hoverZone").css("width", imgWidth+'px');
            $("#hoverZone").css("height", imgHeight+'px');
        } else if(nowRatio > standard){
            imgHeight = (9 * windowWidth)/16;
            imgWidth = windowWidth;
            $("#door_container").css("width", imgWidth+'px');
            $("#door_container").css("height", imgHeight+'px');
            $("#hoverZone").css("width", imgWidth+'px');
            $("#hoverZone").css("height", imgHeight+'px');
        }
    }
    window.addEventListener('resize', detectResize);
    detectResize();
    
    $('#enter1').hover(function(){
        hoverSoundPlay(0);
        $("#mainbg").css("background-image", "url(./image/main1.png)");
    },function() {
        $("#mainbg").css("background-image", "url(./image/main0.png)");
    });
    $('#enter2').hover(function(){
        hoverSoundPlay(1);
        $("#mainbg").css("background-image", "url(./image/main2.png)");
    },function() {
        $("#mainbg").css("background-image", "url(./image/main0.png)");
    });
    $('#enter3').hover(function(){
        hoverSoundPlay(2);
        $("#mainbg").css("background-image", "url(./image/main3.png)");
    },function() {
        $("#mainbg").css("background-image", "url(./image/main0.png)");
    });

    $('#enter1').click(function(){ 
        window.location.href = '/BeakerLab/beakerLab.html';
    })
    $('#enter2').click(function(){
        window.location.href = '/BodyLab/bodyLab.html';
    })
    $('#enter3').click(function(){
        window.location.href = '/PaperLab/paperLab.html';
    })

    $('#loading').click(function(){
        $('#left_door').css("transform", "rotateY(90deg)");
        $('#right_door').css("transform", "rotateY(90deg)");
        setTimeout(function(){
            $('#loading').css("display", "none");
        }, 1100)
    })

    let currentAudio = new Audio();
    let audios = [
        {
            id: '1',
            sound: 'beakerHtml',
            audio: './musics/mainBeakerHoverSound.mp3'
        },
        {
            id: '2',
            sound: 'bodyHtml',
            audio: './musics/mainBodyHoverSound.mp3'
        },
        {
            id: '3',
            sound: 'paperHtml',
            audio: './musics/mainPaperHoverSound.mp3'
        }
    ];
    function hoverSoundPlay(index){
        let audio = new Audio(audios[index].audio);
        currentAudio.pause();
        currentAudio = audio;
        currentAudio.currentTime = 0;
        currentAudio.play();
    }
});
