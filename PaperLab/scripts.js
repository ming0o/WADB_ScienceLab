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
    window.location.href = 'beakerLab.html';
})
$('#enter2').click(function () {
    window.location.href = 'bodyLab.html';
})
$('#enter3').click(function () {
    window.location.href = 'paperLab.html';
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
// ================================================메인화면 돌아가기=================================
let originalPosition1;
$("#goBack_btn").draggable({
    revert: "invalid",
    start: function (event, ui) {
        // 드래그를 시작할 때의 원래 위치 저장
        originalPosition1 = ui.helper.offset();
        $('#down_container, #big_goBack').off('mouseenter mouseleave');
        $("#darkScreen2").css('display', 'block')
        $(document).on('mousemove', startMainUp);
    },
    stop: function (event, ui) {
        $(document).off('mousemove', startMainUp);
        // 드래그 종료시 원래 위치로 이동
        $(this).offset(originalPosition1);
        addGoBackHover()
        $('#down_container').css('display', 'block')
        $('#big_goBack').css('display', 'none')
        $("#darkScreen2").css('display', 'none')
    }
});
// ================================================메인화면 돌아가기=================================

let currentAudio = new Audio()
let focusOnPaper = true
let currentTopPaper = 0
let currentDeg;
function getCurrentRotation(element) {  // 현재 회전각을 계산하는 함수
    var matrix = $(element).css('transform');
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        return angle < 0 ? angle + 360 : angle;
    }
    return 0;
}

const rocketElement = document.querySelector('.rocket');
const paper1PicElement = document.querySelector('#paper1_pic');
let rocketFlying = false;
let rocketAnimationId;

function animateRocket() {
    if (!rocketFlying) {
        rocketElement.classList.add('animate');
        rocketFlying = true;
        requestAnimationFrame(animateRocket);
    }
}

function animateRocketMovement() {
    rocketAnimationId = requestAnimationFrame(animateRocketMovement);
    animateRocket();
}

$('#paper1').click(function () {
    currentTopPaper = 1
    currentDeg = getCurrentRotation('#paper1');
    $(this).css('z-index', 4)
    $(this).css('transform', 'rotate(' + currentDeg + 'deg) scale(1.1, 1.1)')
    $("#player_container" + currentTopPaper).css('display', 'block') // 플레이어 컨테이너만 다른 아이디로 쓰면 다른 요소들은 모두 클래스로 쓰면됨
    if (focusOnPaper) {
        focusOnPaper = false
        animateRocketMovement();
        let audio = new Audio(audios[0].audio);   // audios의 0번째(곡에 따라 변경 필요)
        audio.volume = 0.5;

        currentAudio.pause()
        currentAudio = audio
        currentAudio.currentTime = 0;
        currentAudio.play()
    }
    setTimeout(function () {  // 논문 클릭하면 주위 배경 어두워지는 효과
        $("#darkScreen").css('display', 'block')
        $("#darkScreen").css('z-index', 3)
    }, 100)
    const ro = $(".rocket");
    if (!ro.hasClass("animate")) {
        ro.addClass("animate");
    }
})

let rabbitIndex = 1;
let stopAnimationFlag = false;
function animateRabbit() {
    requestAnimationFrame(animateRabbit);
    rabbitIndex = (parseInt((new Date()).getTime() / 250) % 8) + 1;

    if (stopAnimationFlag) {
        return;
    }
    // 현재 이미지는 투명하게
    $("#paper2_pic img").css("opacity", "0");

    // 다음 이미지는 나타나도록 투명도 조절
    $("#paper2_pic img:nth-child(" + rabbitIndex + ")").css("opacity", "1");
}

$('#paper2').click(function () {
    currentTopPaper = 2;
    currentDeg = getCurrentRotation('#paper2');
    $(this).css('z-index', 4);
    $(this).css('transform', 'rotate(' + currentDeg + 'deg) scale(1.1, 1.1)');
    $("#player_container" + currentTopPaper).css('display', 'block');

    if (focusOnPaper) {
        focusOnPaper = false;
        stopAnimationFlag = false;
        animateRabbit();
        let audio = new Audio(audios[1].audio);
        audio.volume = 0.5;

        currentAudio.pause();
        currentAudio = audio;
        currentAudio.currentTime = 0;
        currentAudio.play();
    }

    setTimeout(function () {
        $("#darkScreen").css('display', 'block');
        $("#darkScreen").css('z-index', 3);
    }, 100);
});
let backIndex = 1;
let stopAnimation = false;

function animateBack() {
    requestAnimationFrame(animateBack);
    backIndex = (parseInt((new Date()).getTime() / 250) % 2) + 1;

    if (stopAnimation) {
        return;
    }
    // 현재 이미지는 투명하게
    $("#paper3_pic img").css("opacity", "0");

    // 다음 이미지는 나타나도록 투명도 조절
    $("#paper2_pic img:nth-child(" + rabbitIndex + ")").css("opacity", "1");
}
$('#paper3').click(function () {
    currentTopPaper = 3
    currentDeg = getCurrentRotation('#paper3');
    console.log('현재 회전 각도: ' + currentDeg + '도');
    $(this).css('z-index', 4)
    $(this).css('transform', 'rotate(' + currentDeg + 'deg) scale(1.1, 1.1)')
    $("#player_container" + currentTopPaper).css('display', 'block') // 플레이어 컨테이너만 다른 아이디로 쓰면 다른 요소들은 모두 클래스로 쓰면됨
    if (focusOnPaper) {
        focusOnPaper = false    // 논문 처음 클릭하면 바로 재생하는 용도
        let audio = new Audio(audios[2].audio)    // audios의 0번째(곡에 따라 변경 필요)
        audio.volume = 0.5;

        currentAudio.pause()
        currentAudio = audio
        currentAudio.currentTime = 0;
        currentAudio.play()
    }
    setTimeout(function () {  // 논문 클릭하면 주위 배경 어두워지는 효과
        $("#darkScreen").css('display', 'block')
        $("#darkScreen").css('z-index', 3)
    }, 100)
    const astro = $(".ast");
    if (!astro.hasClass("animate")) {
        astro.addClass("animate");
    }
    $('#paper3_pic').addClass('changeBackground');
})

$('#paper4').click(function () {
    currentTopPaper = 4
    currentDeg = getCurrentRotation('#paper4');
    $(this).css('z-index', 4)
    $(this).css('transform', 'rotate(' + currentDeg + 'deg) scale(1.1, 1.1)')
    $("#player_container" + currentTopPaper).css('display', 'block') // 플레이어 컨테이너만 다른 아이디로 쓰면 다른 요소들은 모두 클래스로 쓰면됨
    if (focusOnPaper) {
        focusOnPaper = false    // 논문 처음 클릭하면 바로 재생하는 용도
        let audio = new Audio(audios[3].audio)    // audios의 0번째(곡에 따라 변경 필요)
        audio.volume = 0.5;

        currentAudio.pause()
        currentAudio = audio
        currentAudio.currentTime = 0;
        currentAudio.play()
    }
    setTimeout(function () {  // 논문 클릭하면 주위 배경 어두워지는 효과
        $("#darkScreen").css('display', 'block')
        $("#darkScreen").css('z-index', 3)
    }, 100)
    const clouds = $(".clouds");
    if (!clouds.hasClass("animate")) {
        clouds.addClass("animate");
    }
})

$('#darkScreen').click(function () {  // 주위 배경 누르면 원래대로 복귀
    $('#paper' + currentTopPaper).css('z-index', 1)
    $('#paper4').css('z-index', 0)
    $('#paper' + currentTopPaper).css('transform', 'rotate(' + currentDeg + 'deg) scale(1, 1)');
    currentAudio.pause()
    $("#player_container" + currentTopPaper).css('display', 'none')  // 다크스크린은 하나로 공유하기때문에
    $('.play_button').attr("src", "../image/paperStopBtn.png");
    $(this).css('display', 'none')
    $(this).css('z-index', 1)
    focusOnPaper = true
    stopAnimationFlag = true;

    const astronaut = document.querySelector(".ast");
    astronaut.classList.remove("animate");

    const clouds = document.querySelector(".clouds");
    clouds.classList.remove("animate");

    const rocket = document.querySelector(".rocket");
    rocket.classList.remove("animate");
    $('#paper3_pic').removeClass('changeBackground');

})
// ====================================================호버 관련========================================================
$('.button_container').hover(function () {
    $("#player_container" + currentTopPaper).css("opacity", "1");
}, function () {
    $("#player_container" + currentTopPaper).css("opacity", "0");
});

// ====================================================오디오 관련========================================================
let audios = [
    {
        id: 'univ', // 쓰이진않아서 아무의미없고 그냥 어떤 논문 페이지 노래인지 코드에서 알수있게 넣어둠 
        audio: '../musics/universe.mp3',
    },
    {
        id: 'rabbit',
        audio: '../musics/moon.mp3',
    },
    {
        id: 'astro',
        audio: '../musics/astro.mp3',
    },
    {
        id: 'earth',
        audio: '../musics/earth.mp3',
    }
]

// 버튼 이벤트
$('.play_button').click(function () { // 재생/일시정지
    if (currentAudio.paused == true) {
        currentAudio.play()
        $('.play_button').attr("src", "../image/paperStopBtn.png");

    }
    else {
        currentAudio.pause()
        console.log("눌림")
        $('.play_button').attr("src", "../image/paperPlayBtn.png");
    }
})
$('.for10_button').click(function () {
    currentAudio.currentTime += 10
})
$('.back10_button').click(function () {
    currentAudio.currentTime -= 10
})

// 현재 시간 얻기
setInterval(function () {
    let barWidth = $('.current_bar' + currentTopPaper).innerWidth();
    $('.current_bar' + currentTopPaper + ' > div').css('width', barWidth * currentAudio.currentTime / currentAudio.duration)
}, 50)
