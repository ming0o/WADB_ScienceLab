// ================================================= 메인화면 전환 =================================================
function startMainUp(e) {
    let y = e.pageY;
    let windowHeight = window.innerHeight;
    let standard = windowHeight / 2
    if (y <= standard) {
        $("#small_up").css("background-image", "url(../image/smallUp2.png)");
        $("#big_up").css("background-image", "url(../image/bigUp2.png)");

        currentAudio.pause()
        setTimeout(function () {
            $("#goBack_btn").css('opacity', '0')
        }, 100)
        setTimeout(function () {
            $("#mainbg").css('top', 0)
        }, 700)

    }
}
let downIndex = 0
let upIndex = 0
function changeDown() {
    setInterval(function () {
        $('#small_down').css('opacity', downIndex)
        downIndex = ((downIndex + 1) % 2);
        $('#big_down').css('opacity', downIndex)
    }, 1000);
}
function changeUP() {
    setInterval(function () {
        $('#small_up').css('opacity', upIndex)
        upIndex = ((upIndex + 1) % 2);
        $('#big_up').css('opacity', upIndex)
    }, 850);
}
changeDown();
changeUP();
$('#enter1').hover(function () {
    hoverSoundPlay(0)
    $("#mainbg").css("background-image", "url(../image/main1.png)");
}, function () {
    $("#mainbg").css("background-image", "url(../image/main0.png)");
});
$('#enter2').hover(function () {
    hoverSoundPlay(1)
    $("#mainbg").css("background-image", "url(../image/main2.png)");
}, function () {
    $("#mainbg").css("background-image", "url(../image/main0.png)");
});
$('#enter3').hover(function () {
    hoverSoundPlay(2)
    $("#mainbg").css("background-image", "url(../image/main3.png)");
}, function () {
    $("#mainbg").css("background-image", "url(../image/main0.png)");
});


// 버튼 이벤트
$('#enter1').click(function () {
    window.location.href = '/Beaker/beakerLab.html';
})
$('#enter2').click(function () {
    window.location.href = '/BodyLab/bodyLab.html';
})
$('#enter3').click(function () {
    window.location.href = '/PaperLab/paperLab.html';
})

// 현재 재생중인 오디오
let currentEAudio = new Audio()
let effectAudios = [
    {
        id: '1',
        sound: 'beakerHtml',
        audio: '../musics/mainBeakerHoverSound.mp3'
    },
    {
        id: '2',
        sound: 'bodyHtml',
        audio: '../musics/mainBodyHoverSound.mp3'
    },
    {
        id: '3',
        sound: 'paperHtml',
        audio: '../musics/mainPaperHoverSound.mp3'
    }
]
function hoverSoundPlay(index) {
    if (index == 0) {
        let audio = new Audio(effectAudios[index].audio)
        currentEAudio.pause()
        currentEAudio = audio
        currentEAudio.currentTime = 0;
        currentEAudio.play()
    }
    else if (index == 1) {
        let audio = new Audio(effectAudios[index].audio)
        currentEAudio.pause()
        currentEAudio = audio
        currentEAudio.currentTime = 0;
        currentEAudio.play()
    }
    else if (index == 2) {
        let audio = new Audio(effectAudios[index].audio)
        currentEAudio.pause()
        currentEAudio = audio
        currentEAudio.currentTime = 0;
        currentEAudio.play()
    }
}
let goBackBtnHover = false
function detectResize() {
    // 현재 윈도우 창의 너비와 높이 얻기
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    goBackImgHeight = (136 * windowWidth) / 1920
    $("#goBack_container").css("width", windowWidth + 'px');
    $("#goBack_container").css("height", goBackImgHeight + 'px');
    $("#down_container").css("width", windowWidth + 'px');

    let standard = 9 / 16 // 기준 비율
    let nowRatio = Number((windowHeight / windowWidth).toFixed(4))    // 현재 비율
    let imgWidth;
    let imgHeight;
    if (nowRatio < standard) {    // 현재 비율이 기준보다 작을때 오져따 이걸 이렇게 쉽게 해결하다니
        imgWidth = (16 * windowHeight) / 9
        imgHeight = windowHeight
        $("#hoverZone").css("width", imgWidth + 'px');
        $("#hoverZone").css("height", imgHeight + 'px');
    }
    else if (nowRatio > standard) {
        imgHeight = (9 * windowWidth) / 16
        imgWidth = windowWidth
        $("#hoverZone").css("width", imgWidth + 'px');
        $("#hoverZone").css("height", imgHeight + 'px');
    }


}

window.addEventListener('resize', detectResize);
detectResize();

$('#down_container').hover(function () {
    $('#down_container').css('display', 'none')
    $('#big_goBack').css('display', 'flex')
}, function () {
});
$('#big_goBack').hover(function () {
}, function () {
    $('#down_container').css('display', 'block')
    $('#big_goBack').css('display', 'none')
});
function addGoBackHover() {   // 제거했던 캐릭터 호버 이벤트 매핑해주는 역할
    $('#down_container').on({
        mouseenter: function () {
            $('#down_container').css('display', 'none')
            $('#big_goBack').css('display', 'flex')
        },
        mouseleave: function () {
        }
    });
    $('#big_goBack').on({
        mouseenter: function () {
        },
        mouseleave: function () {
            $('#down_container').css('display', 'block')
            $('#big_goBack').css('display', 'none')
        }
    });
}
// ================================================= 메인화면 전환 코드 끝 =================================================

let nowPlaying = 'none'
let dynamicMoveInterval;
let stomaIndex = 1;  // 현재 장기 이미지의 인덱스
let liverIndex = 1;
let intestIndex = 1;
let lungIndex = 1;
let eyesIndex = 1;

function movingEyes() {
    dynamicMoveInterval = setInterval(function () {
        eyesIndex = (eyesIndex % 3) + 1;
        $('#eyes_fix').attr("src", "../image/eyes" + eyesIndex + ".png");
        console.log("눈 재생중!!")
    }, 300);
}
function movingLung() {
    dynamicMoveInterval = setInterval(function () {
        lungIndex = (lungIndex % 4) + 1;
        $('#lung_fix').attr("src", "../image/lung" + lungIndex + ".png");
        console.log("폐 재생중!!")
    }, 300);
}
function movingStoma() {
    dynamicMoveInterval = setInterval(function () {
        stomaIndex = (stomaIndex % 5) + 1;  // 1, 2, 3, 4, 5 순환
        $('#stoma_fix').attr("src", "../image/stoma" + stomaIndex + ".png");
        console.log("위가 재생중!!")
    }, 300);
}
function movingLiver() {
    dynamicMoveInterval = setInterval(function () {
        liverIndex = (liverIndex % 3) + 1;
        $('#liver_fix').attr("src", "../image/liver" + liverIndex + ".png");
        console.log("간이 재생중!!")
    }, 300);
}
function movingIntest() {
    dynamicMoveInterval = setInterval(function () {
        intestIndex = (intestIndex % 5) + 1;
        $('#intest_fix').attr("src", "../image/intest" + intestIndex + ".png");
        console.log("대장 재생중!!")
    }, 300);
}

$("#eyes, #lung, #stoma, #liver, #intest").hover(function () {
    $(this).css("background-image", "url(../image/" + this.id + "Big.png)");
}, function () {
    $(this).css("background-image", "url(../image/" + this.id + ".png)");
});



let playerDisplay = false
// 현재 재생중인 오디오
let currentAudio = new Audio()

let audios = [
    {
        id: 'eyes',
        audio: '../musics/눈 (Prod. 기리보이).m4a',
        image: '../musics/00.png',
        anime: '눈',
        title: '(Prod. 기리보이)',
        author: 'Lil tachi, 호치키스'
    },
    {
        id: 'lung',
        audio: '../musics/산소같은 너.m4a',
        image: '../musics/01.png',
        anime: '산소',
        title: '같은 너',
        author: '샤이니'
    },
    {
        id: 'stoma',
        audio: '../musics/위아래.m4a',
        image: '../musics/02.png',
        anime: '위',
        title: '아래',
        author: 'EXID'
    },
    {
        id: 'liver',
        audio: '../musics/파파라치 (feat. 에릭).m4a',
        image: '../musics/02.png',
        anime: '간',
        title: '파파라치 (feat. 에릭)',
        author: '미연'
    },
    {
        id: 'intest',
        audio: '../musics/Lazenca, Save Us (우리 동네 음악대장).m4a',
        image: '../musics/02.png',
        anime: '대장',
        title: 'Lazenca, Save Us',
        author: '우리 동네 음악'
    }
]



// 현재 시간 얻기
setInterval(function () {
    let minutes = Math.floor(currentAudio.currentTime / 60);
    let seconds = Math.floor(currentAudio.currentTime % 60);
    let timeString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    $('#current_time').text(timeString);
    minutes = Math.floor(currentAudio.duration / 60);
    seconds = Math.floor(currentAudio.duration % 60);
    timeString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    $('#total_time').text(timeString);

    if ($('#current_time').text() == $('#total_time').text()) {
        setTimeout(function () {
            currentAudio.currentTime = 0
            $('#play_button').attr("src", "../image/playBtn.png");
        }, 1000)
    }

    let barWidth = $('#current_bar').innerWidth();
    $('#current_bar > div').css('width', barWidth * currentAudio.currentTime / currentAudio.duration)

    $('#current_bar > div > div').css('left', (Number($('#current_bar').css('margin-left').slice(0, -2)) + Number($('#current_bar > div').css('width').slice(0, -2))) + 'px')
}, 50)

$('#for10_button').click(function () {
    currentAudio.currentTime += 10
})
$('#back10_button').click(function () {
    currentAudio.currentTime -= 10
})
// 버튼 이벤트
$('#play_button').click(function () { // 재생/일시정지
    if (currentAudio.paused == true) {
        currentAudio.play()
        if (nowPlaying == 'lung') { movingLung() }
        else if (nowPlaying == 'stoma') { movingStoma() }
        else if (nowPlaying == 'liver') { movingLiver() }
        else if (nowPlaying == 'intest') { movingIntest() }
        movingText(animeTag);
        $('#play_button').attr("src", "../image/pauseBtn.png");
    }
    else {
        currentAudio.pause()
        stopText();
        clearInterval(dynamicMoveInterval)
        $('#play_button').attr("src", "../image/playBtn.png");
    }
})
let animationTimeout;
let animeTag;
function movingText(animeTag) { // 강조하고싶은 글자 움직이게 만드는 함수
    const cTitle = $(animeTag);

    function animate() {
        cTitle.animate({ 'margin-top': -5 }, 170).animate({ 'margin-top': 0 }, 170)
        cTitle.animate({ 'margin-top': -5 }, 170).animate({ 'margin-top': 0 }, 170)

        animationTimeout = setTimeout(animate, 1400);
    }
    animate();

}
function stopText() {
    clearTimeout(animationTimeout);
}

// ================================================메인화면 돌아가기=================================
let originalPosition1;
$("#goBack_btn").draggable({
    revert: "invalid",
    start: function (event, ui) {
        // 드래그를 시작할 때의 원래 위치 저장
        originalPosition1 = ui.helper.offset();
        $('#down_container, #big_goBack').off('mouseenter mouseleave');
        $("#darkScreen").css('display', 'block')
        $(document).on('mousemove', startMainUp);
    },
    stop: function (event, ui) {
        $(document).off('mousemove', startMainUp);
        // 드래그 종료시 원래 위치로 이동
        $(this).offset(originalPosition1);
        addGoBackHover()
        $('#down_container').css('display', 'block')
        $('#big_goBack').css('display', 'none')
        $("#darkScreen").css('display', 'none')
    }
});
// ================================================메인화면 돌아가기=================================
$("#eyes").draggable({ revert: "invalid" });
$("#lung").draggable({ revert: "invalid" });
$("#stoma").draggable({ revert: "invalid" });
$("#liver").draggable({ revert: "invalid" });
$("#intest").draggable({ revert: "invalid" });
$("#eyes_fix").droppable({
    accept: "#eyes",
    classes: {
        "ui-droppable-active": "hint",
    },
    drop: function (event, ui) {
        $("#eyes").css("display", "none");
        $("#eyes_fix").css("opacity", "100");
        clearInterval(dynamicMoveInterval)
        movingEyes()
        for (let i in audios) {
            if (audios[i].id == "eyes") {
                // 오디오 정보 변수
                let audio = new Audio(audios[i].audio)
                let image = audios[i].image
                let title = audios[i].title
                let author = audios[i].author
                let ainme = audios[i].anime

                $("#animeTitle").css('display', 'block');
                $("#animeSinger1").css('display', 'none');
                $("#animeSinger2").css('display', 'none');

                animeTag = "#animeTitle"
                $("#animeTitle").text(ainme);
                $("#current_song").text(title);
                stopText();
                movingText(animeTag)
                $("#current_singer").text(author);
                if (!playerDisplay) {
                    $("#player_container").css("display", "block");
                    playerDisplay = true
                }
                if (currentAudio.paused == true) { $('#play_button').attr("src", "../image/pauseBtn.png"); } // pause상태에서 다른 장기 놨을때 플레이버튼 변경
                currentAudio.pause()
                currentAudio = audio
                currentAudio.currentTime = 0;
                currentAudio.volume = 0.3;  // 음악 소리 30퍼센트로 조절
                currentAudio.play()
            }
        }
    }
})
$("#stoma_fix").droppable({
    accept: "#stoma",
    classes: {
        "ui-droppable-active": "hint",
    },
    drop: function (event, ui) {
        $("#stoma").css("display", "none");
        $("#stoma_fix").css("opacity", "100");
        clearInterval(dynamicMoveInterval)
        movingStoma()
        nowPlaying = 'stoma'
        for (let i in audios) {
            if (audios[i].id == "stoma") {
                let audio = new Audio(audios[i].audio)
                let image = audios[i].image
                let title = audios[i].title
                let author = audios[i].author
                let ainme = audios[i].anime

                $("#animeTitle").css('display', 'block');
                $("#animeSinger1").css('display', 'none');
                $("#animeSinger2").css('display', 'none');

                animeTag = "#animeTitle"
                $("#animeTitle").text(ainme);
                $("#current_song").text(title);
                stopText();
                movingText(animeTag)
                $("#current_singer").text(author);
                if (!playerDisplay) {
                    $("#player_container").css("display", "block");
                    playerDisplay = true
                }
                if (currentAudio.paused == true) { $('#play_button').attr("src", "../image/pauseBtn.png"); }
                currentAudio.pause()
                currentAudio = audio
                currentAudio.currentTime = 0;
                currentAudio.volume = 0.3;  // 음악 소리 30퍼센트로 조절
                currentAudio.play()
            }
        }
    }
})
$("#liver_fix").droppable({
    accept: "#liver",
    classes: {
        "ui-droppable-active": "hint",
    },
    drop: function (event, ui) {
        $("#liver").css("display", "none");
        $("#liver_fix").css("opacity", "100");
        clearInterval(dynamicMoveInterval)
        movingLiver()
        nowPlaying = 'liver'
        for (let i in audios) {
            if (audios[i].id == "liver") {
                let audio = new Audio(audios[i].audio)
                let image = audios[i].image
                let title = audios[i].title
                let author = audios[i].author
                let ainme = audios[i].anime

                $("#animeTitle").css('display', 'none');
                $("#animeSinger1").css('display', 'block');
                $("#animeSinger2").css('display', 'none');

                $("#current_song").text(title);
                $("#animeSinger1").text(ainme);
                $("#current_singer").text(author);
                animeTag = "#animeSinger1"
                stopText();
                movingText(animeTag)

                if (!playerDisplay) {
                    $("#player_container").css("display", "block");
                    playerDisplay = true
                }
                if (currentAudio.paused == true) { $('#play_button').attr("src", "../image/pauseBtn.png"); }
                currentAudio.pause()
                currentAudio = audio
                currentAudio.currentTime = 0;
                currentAudio.volume = 0.3;  // 음악 소리 30퍼센트로 조절
                currentAudio.play()
            }
        }
    }
})
$("#intest_fix").droppable({
    accept: "#intest",
    classes: {
        "ui-droppable-active": "hint",
    },
    drop: function (event, ui) {
        $("#intest").css("display", "none");
        $("#intest_fix").css("opacity", "100");
        clearInterval(dynamicMoveInterval)
        movingIntest()
        nowPlaying = 'intest'
        for (let i in audios) {
            if (audios[i].id == "intest") {
                let audio = new Audio(audios[i].audio)
                let image = audios[i].image
                let title = audios[i].title
                let author = audios[i].author
                let ainme = audios[i].anime

                $("#animeTitle").css('display', 'none');
                $("#animeSinger1").css('display', 'none');
                $("#animeSinger2").css('display', 'block');

                $("#current_song").text(title);
                $("#current_singer").text(author);
                $("#animeSinger2").text(ainme);
                animeTag = "#animeSinger2"
                stopText();
                movingText(animeTag)

                if (!playerDisplay) {
                    $("#player_container").css("display", "block");
                    playerDisplay = true
                }
                if (currentAudio.paused == true) { $('#play_button').attr("src", "../image/pauseBtn.png"); }
                currentAudio.pause()
                currentAudio = audio
                currentAudio.currentTime = 0;
                currentAudio.volume = 0.3;  // 음악 소리 30퍼센트로 조절
                currentAudio.play()
            }
        }
    }
})
$("#lung_fix").droppable({
    accept: "#lung",
    classes: {
        "ui-droppable-active": "hint",
    },
    drop: function (event, ui) {
        $("#lung").css("display", "none");
        $("#lung_fix").css("opacity", "100");
        clearInterval(dynamicMoveInterval)
        movingLung()
        nowPlaying = 'lung'
        for (let i in audios) {
            if (audios[i].id == "lung") {
                let audio = new Audio(audios[i].audio)
                let image = audios[i].image
                let title = audios[i].title
                let author = audios[i].author
                let ainme = audios[i].anime

                $("#animeTitle").css('display', 'block');
                $("#animeSinger1").css('display', 'none');
                $("#animeSinger2").css('display', 'none');

                animeTag = "#animeTitle"
                $("#animeTitle").text(ainme);
                $("#current_song").text(title);
                stopText();
                movingText(animeTag)
                $("#current_singer").text(author);
                if (!playerDisplay) {
                    $("#player_container").css("display", "block");
                    playerDisplay = true
                }
                if (currentAudio.paused == true) { $('#play_button').attr("src", "../image/pauseBtn.png"); }
                currentAudio.pause()
                currentAudio = audio
                currentAudio.currentTime = 0;
                currentAudio.volume = 0.3;  // 음악 소리 30퍼센트로 조절
                currentAudio.play()
            }
        }
    }
})