$( function() {
    let downIndex = 0
    let upIndex = 0
    function changeDown () { 
        setInterval(function () {
            $('#small_down').css('opacity', downIndex)
            downIndex = ((downIndex+1) % 2);
            $('#big_down').css('opacity', downIndex)
        }, 1000);
    }
    function changeUP () { 
        setInterval(function () {
            $('#small_up').css('opacity', upIndex)
            upIndex = ((upIndex+1) % 2);
            $('#big_up').css('opacity', upIndex)
        }, 850);
    }
    changeDown();
    changeUP();
    $('#enter1').hover(function(){
        hoverSoundPlay(0)
        $("#mainbg").css("background-image", "url(../image/main1.png)");
    },function() {
        $("#mainbg").css("background-image", "url(../image/main0.png)");
    });
    $('#enter2').hover(function(){
        hoverSoundPlay(1)
        $("#mainbg").css("background-image", "url(../image/main2.png)");
    },function() {
        $("#mainbg").css("background-image", "url(../image/main0.png)");
    });
    $('#enter3').hover(function(){
        hoverSoundPlay(2)
        $("#mainbg").css("background-image", "url(../image/main3.png)");
    },function() {
        $("#mainbg").css("background-image", "url(../image/main0.png)");
    });


    // 버튼 이벤트
    $('#enter1').click(function(){ 
        window.location.href = '/BeakerLab/beakerLab.html';
    })
    $('#enter2').click(function(){
        window.location.href = '/BodyLab/bodyLab.html';
    })
    $('#enter3').click(function(){
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
    function hoverSoundPlay (index){
        if(index == 0){
            let audio   = new Audio(effectAudios[index].audio)
            currentEAudio.pause()
            currentEAudio = audio
            currentEAudio.currentTime = 0;
            currentEAudio.play()
        }
        else if(index == 1){
            let audio   = new Audio(effectAudios[index].audio)
            currentEAudio.pause()
            currentEAudio = audio
            currentEAudio.currentTime = 0;
            currentEAudio.play()
        }
        else if(index == 2){
            let audio   = new Audio(effectAudios[index].audio)
            currentEAudio.pause()
            currentEAudio = audio
            currentEAudio.currentTime = 0;
            currentEAudio.play()
        }
    }
    let goBackBtnHover = false
    function detectResize() {
        // 현재 윈도우 창의 너비와 높이 얻기
        let windowWidth = window.innerWidth ;
        let windowHeight = window.innerHeight ;
        
        goBackImgHeight = (136 * windowWidth)/1920
        $("#goBack_container").css("width", windowWidth+'px');
        $("#goBack_container").css("height", goBackImgHeight+'px');
        $("#down_container").css("width", windowWidth+'px');

        let standard = 9/16 // 기준 비율
        let nowRatio = Number((windowHeight/windowWidth).toFixed(4))    // 현재 비율
        let imgWidth;
        let imgHeight;
        if(nowRatio < standard){    // 현재 비율이 기준보다 작을때 오져따 이걸 이렇게 쉽게 해결하다니
            imgWidth = (16 * windowHeight)/9
            imgHeight = windowHeight
            $("#hoverZone").css("width", imgWidth+'px');
            $("#hoverZone").css("height", imgHeight+'px');
        }
        else if(nowRatio > standard){
            imgHeight = (9 * windowWidth)/16
            imgWidth = windowWidth
            $("#hoverZone").css("width", imgWidth+'px');
            $("#hoverZone").css("height", imgHeight+'px');
        }


    }

    window.addEventListener('resize', detectResize);
    detectResize();

    $('#down_container').hover(function(){
        $('#down_container').css('display', 'none')
        $('#big_goBack').css('display', 'flex')
    },function() {
    });
    $('#big_goBack').hover(function(){
    },function() {
        $('#down_container').css('display', 'block')
        $('#big_goBack').css('display', 'none')
    });
    function addGoBackHover() {   // 제거했던 캐릭터 호버 이벤트 매핑해주는 역할
        $('#down_container').on({
            mouseenter: function() {
                $('#down_container').css('display', 'none')
                $('#big_goBack').css('display', 'flex')
            },
            mouseleave: function() {
            }
        });
        $('#big_goBack').on({
            mouseenter: function() {
            },
            mouseleave: function() {
                $('#down_container').css('display', 'block')
                $('#big_goBack').css('display', 'none')
            }
        });
    }

    let originalPosition0; 
    let originalPosition1;
    let originalPosition2;
    let originalPosition3;
    let originalPosition4;
    let originalPosition5;
    let originalPosition6;

    let waveIndex = 1;  // 현재 물결 이미지의 인덱스
    let color;
    let animationId;  // requestAnimationFrame의 반환 값
    let stopAnimationFlag = false;
    let globalColor = "blue"
    let isSingerIn = true;

    function makeWave(color = "blue") {
        globalColor = color;
        animate1()
    }

    function animate1() {
        requestAnimationFrame(animate1);
        waveIndex = ( parseInt((new Date()).getTime()/1000) % 4) + 1;  // 1, 2, 3, 4를 순환하도록 설정

        if (stopAnimationFlag) {    // requestAnimationFrame을 종료하는거시아니다! 그냥 리턴시키는것 뿐이다!
            // console.log("리턴됨!", globalColor)
            return;
        }
        // 색상에 따른 이미지 변경
        $("#beaker_back").css("background-image", "url(../image/plask_back_" + globalColor + waveIndex + ".png)");
        $("#beaker_cover").css("background-image", "url(../image/plask_" + globalColor + waveIndex + ".png)");
    }
    let up = true;
    let down = false;
    let now_margin;
    let moveIndex = 1;
    let stopSinger = false;
    function falling(){     // 비커 내부로 캐릭터 떨어지는 애니메이션 함수
        $('#singer1').css('transition', 'none');
        $("#singer1").animate({'margin-top': -200}, 0)      // 비커 안 캐릭터 보이기
        $("#singer1").css("opacity", "1")
        $("#singer1").animate({'margin-top': 20}, 200)
        $("#singer1").animate({'margin-top': -20}, 200)
        $("#singer1").animate({'margin-top': 5}, 200)
        $("#singer1").animate({'margin-top': -5}, 200)
        $("#singer1").animate({'margin-top': 0}, 200)
    }
    function flySinger(){   // 비커 밖으로 캐릭터 튕겨나가는 애니메이션 함수
        $('#singer1').css('transition', 'none');
        $("#singer1").animate({'margin-top': -5}, 100)
        $("#singer1").animate({'margin-top': 5}, 100)
        $("#singer1").animate({'margin-top': -10}, 100)
        $("#singer1").animate({'margin-top': 10}, 100)
        $("#singer1").animate({'margin-top': -15}, 100)
        $("#singer1").animate({'margin-top': 15}, 100)
        $("#singer1").animate({'margin-top': -20}, 100)
        $("#singer1").animate({'margin-top': 20}, 100)
        $("#singer1").animate({'margin-top': -200}, 200)      // 비커 안 캐릭터 보이기
    }
    function animate2() {   // 비커 안에서 둥둥 떠다니는 애니메이션
        requestAnimationFrame(animate2);
        moveIndex = ( parseInt((new Date()).getTime()/1000) % 2);  // 1초마다 moveIndex 값 0, 1 변경
        now_margin = $("#singer1").css('margin-top')
        if (stopSinger) {    // requestAnimationFrame을 종료하는거시아니다! 그냥 리턴시키는것 뿐이다!
            // console.log("싱어 리턴됨!")
            return;
        }
        if(moveIndex){
            $("#singer1").css('margin-top', -5)
        }
        else{
            $("#singer1").css('margin-top', 10)
        }
    }
    animate2();
    function stopSingerMove() {  // 사실 requestAnimationFrame을 종료하는거시 아니다! 그저 종료한것처럼 보이게 하는것 뿐이다!
        stopSinger = true;
    }
    // 애니메이션 종료
    function stopAnimation() {  // 사실 requestAnimationFrame을 종료하는거시 아니다! 그저 종료한것처럼 보이게 하는것 뿐이다!
        stopAnimationFlag = true;
    }
    makeWave();
    // ==============================================================================================

    function addHover() {   // 제거했던 호버 이벤트 매핑해주는 역할
        $('#songBox1').on({
            mouseenter: function() {
                startHoverEffect("#songBox1");
            },
            mouseleave: function() {
                stopHoverEffect("#songBox1");
            }
        });
        $('#songBox2').on({
            mouseenter: function() {
                startHoverEffect("#songBox2");
            },
            mouseleave: function() {
                stopHoverEffect("#songBox2");
            }
        });
        $('#songBox3').on({
            mouseenter: function() {
                startHoverEffect("#songBox3");
            },
            mouseleave: function() {
                stopHoverEffect("#songBox3");
            }
        });
    }
    function addSingerHover() {   // 제거했던 캐릭터 호버 이벤트 매핑해주는 역할
        $('#singerBox1').on({
            mouseenter: function() {
                $(this).css("background-image", "url(../image/hoverD.png)");
                startSingerHoverEffect("#singerBox1");
            },
            mouseleave: function() {
                $(this).css("background-image", "url(../image/standD.png)");
                stopSingerHoverEffect("#singerBox1");
            }
        });
        $('#singerBox2').on({
            mouseenter: function() {
                $(this).css("background-image", "url(../image/hoverM.png)");
                startSingerHoverEffect("#singerBox2");
            },
            mouseleave: function() {
                $(this).css("background-image", "url(../image/standM.png)");
                stopSingerHoverEffect("#singerBox2");
            }
        });
        $('#singerBox3').on({
            mouseenter: function() {
                $(this).css("background-image", "url(../image/hoverR.png)");
                startSingerHoverEffect("#singerBox3");
            },
            mouseleave: function() {
                $(this).css("background-image", "url(../image/standR.png)");
                stopSingerHoverEffect("#singerBox3");
            }
        });
    }

    // hover 효과 시작 함수
    function startHoverEffect(selector) {
        $(selector).data("hoverAnimation", true);   // 호버 중
        animateHoverEffect(selector);
    }

    // hover 효과 애니메이션 함수
    function animateHoverEffect(selector) {
        if ($(selector).data("hoverAnimation")) {   // 만약 마우스 호버 중이면~
            $(selector).animate({'rotate': '-5deg'}, 100, function() {
                $(this).animate({'rotate': '5deg'}, 100, function() {
                    $(this).css({'rotate': '0deg'});
                    // 필요한 만큼 반복
                    animateHoverEffect(selector);
                });
            });
        }
    }
    // hover 효과 정지 함수
    function stopHoverEffect(selector) {
        $(selector).data("hoverAnimation", false).stop('rotate', true).css({'rotate': '0deg'}); //호버 중이 아님을 기록하고, 회전애니메이션만 중지, 각도 원상태로
    }
    // ==============================================================================================

    // hover 효과 시작 함수
    function startSingerHoverEffect(selector) {
        $(selector).data("singerHover", true);   // 호버 중
        singerJumpEffect(selector);
    }
    
    // hover 효과 애니메이션 함수
    function singerJumpEffect(selector) {
        if ($(selector).data("singerHover")) {   // 만약 마우스 호버 중이면~
            $(selector).animate({'margin-top': -10}, 200, function() {
                $(this).animate({'margin-top': 0}, 200, function() {
                    $(this).delay(200).css({'margin-top': 0});
                    // 반복
                    singerJumpEffect(selector);
                });
            });
        }
    }
    
    // hover 효과 정지 함수
    function stopSingerHoverEffect(selector) {
        $(selector).data("singerHover", false).stop(true, true).css({'margin-top': 0}); //호버 중이 아님을 기록하고, 마진탑애니메이션만 중지, 마진탑 원상태로
    }
    $('#singerBox1').hover(function(){
        $(this).css("background-image", "url(../image/hoverD.png)");
        startSingerHoverEffect(this);
    },function() {
        $(this).css("background-image", "url(../image/standD.png)");
        stopSingerHoverEffect(this);
    });
    $('#singerBox2').hover(function(){
        $(this).css("background-image", "url(../image/hoverM.png)");
        startSingerHoverEffect(this);
    },function() {
        $(this).css("background-image", "url(../image/standM.png)");
        stopSingerHoverEffect(this);
    });
    $('#singerBox3').hover(function(){
        $(this).css("background-image", "url(../image/hoverR.png)");
        startSingerHoverEffect(this);
    },function() {
        $(this).css("background-image", "url(../image/standR.png)");
        stopSingerHoverEffect(this);
    });
    
    $("#songBox1, #songBox2, #songBox3").hover(function() {
        startHoverEffect(this);
    }, function() {
        stopHoverEffect(this);
    });
    let isTwo = false
    $('#beaker_cover').hover(function(){
        if(isTwo){
            $("#beaker_border").css("opacity", "1");
        }
    },function() {
        if(isTwo){
            $("#beaker_border").css("opacity", "0");
        }
    });

    function magaeClose1(){
        setTimeout(function(){
            $("#magae1").animate({'margin-top': -200}, 0)
            $("#magae1").css('opacity', '100')
            $("#magae1").animate({'margin-top': 0}, 200)
        }, 800)
        setTimeout(function(){
            $("#magae1").css('opacity', '0')
            $("#songBox1").css('display', 'none')
            $("#songShadow1").css('opacity', '0')
            $("#songBox_closed1").css('opacity', '1')
        }, 1000)
    }
    function magaeClose2(){
        setTimeout(function(){
            $("#magae2").animate({'margin-top': -200}, 0)
            $("#magae2").css('opacity', '100')
            $("#magae2").animate({'margin-top': 0}, 200)
        }, 800)
        setTimeout(function(){
            $("#magae2").css('opacity', '0')
            $("#songBox2").css('display', 'none')
            $("#songShadow2").css('opacity', '0')
            $("#songBox_closed2").css('opacity', '1')
        }, 1000)
    }
    function magaeClose3(){
        setTimeout(function(){
            $("#magae3").animate({'margin-top': -200}, 0)
            $("#magae3").css('opacity', '100')
            $("#magae3").animate({'margin-top': 0}, 200)
        }, 800)
        setTimeout(function(){
            $("#magae3").css('opacity', '0')
            $("#songBox3").css('display', 'none')
            $("#songShadow3").css('opacity', '0')
            $("#songBox_closed3").css('opacity', '1')
        }, 1000)
    }
    function magaeOpen1(){
        setTimeout(function(){
            $("#songBox1").css('display', 'block')
            $("#songBox_closed1").css('opacity', '0')
            $("#songShadow1").css('opacity', '1')
            $("#magae1").css('opacity', '100')
            $("#magae1").animate({'margin-top': -200}, 200)
        }, 300)
        setTimeout(function(){
            $("#magae1").css('opacity', '0')
        }, 500)
    }
    function magaeOpen2(){
        setTimeout(function(){
            $("#songBox2").css('display', 'block')
            $("#songBox_closed2").css('opacity', '0')
            $("#songShadow2").css('opacity', '1')
            $("#magae2").css('opacity', '100')
            $("#magae2").animate({'margin-top': -200}, 200)
        }, 300)
        setTimeout(function(){
            $("#magae2").css('opacity', '0')
        }, 500)
    }
    function magaeOpen3(){
        setTimeout(function(){
            $("#songBox3").css('display', 'block')
            $("#songBox_closed3").css('opacity', '0')
            $("#songShadow3").css('opacity', '1')
            $("#magae3").css('opacity', '100')
            $("#magae3").animate({'margin-top': -200}, 200)
        }, 300)
        setTimeout(function(){
            $("#magae3").css('opacity', '0')
        }, 500)
    }
    function startMainUp(e) {
        let y = e.pageY;
        let windowHeight = window.innerHeight ;
        let standard = windowHeight/2
        if(y <= standard){
            $("#small_up").css("background-image", "url(../image/smallUp2.png)");
            $("#big_up").css("background-image", "url(../image/bigUp2.png)");
            
            currentAudio.pause()
            setTimeout(function(){
                $("#goBack_btn").css('opacity', '0')
            }, 100)
            setTimeout(function(){
                $("#mainbg").css('top', 0)
            }, 700)
            
        }
    }
    $( "#goBack_btn" ).draggable({ 
        revert: "invalid",
        start: function(event, ui) {
            // 드래그를 시작할 때의 원래 위치 저장
            originalPosition0 = ui.helper.offset();
            $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", true);
            $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", true);
            $("#singerBox1, #singerBox2, #singerBox3").off('mouseenter mouseleave');
            $('#songBox1, #songBox2, #songBox3').off('mouseenter mouseleave');
            $('#down_container, #big_goBack').off('mouseenter mouseleave');
            $("#darkScreen").css('display', 'block')
            $(document).on('mousemove', startMainUp);
        },
        stop: function(event, ui) {
            $(document).off('mousemove', startMainUp);
            // 드래그 종료시 원래 위치로 이동
            $(this).offset(originalPosition0);
            $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", false);
            $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", false);
            addSingerHover()
            addHover()
            addGoBackHover()
            $('#down_container').css('display', 'block')
            $('#big_goBack').css('display', 'none')
            $("#darkScreen").css('display', 'none')
        }
    });
    $( "#singerBox1" ).draggable({ 
        revert: "invalid",
        start: function(event, ui) {
            stopSingerHoverEffect("#singerBox1");
            // 드래그를 시작할 때의 원래 위치 저장
            originalPosition1 = ui.helper.offset();
            $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", true);
            $("#singerBox1, #singerBox2, #singerBox3").off('mouseenter mouseleave');
            
        },
        stop: function(event, ui) {
            // 드래그 종료시 원래 위치로 이동
            $(this).offset(originalPosition1);
            if ($(this).css('opacity') != '0'){
                $(this).css("background-image", "url(../image/standD.png)");
                $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", false);
                addSingerHover()
            }
            else if ($(this).css('opacity') == '0'){
                setTimeout(function(){
                    $("#singerBox2, #singerBox3").css('transition','background-image 1s ease')
                    $("#singerBox2").css("background-image", "url(../image/deadM.png)");
                    $("#singerBox3").css("background-image", "url(../image/deadR.png)");
                }, 200)
            }
            // console.log("되돌아옴!!")
        }
    });
    $( "#singerBox2" ).draggable({ 
        revert: "invalid",
        start: function(event, ui) {
            stopSingerHoverEffect("#singerBox2");
            originalPosition2 = ui.helper.offset();
            $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", true);
            $("#singerBox1, #singerBox2, #singerBox3").off('mouseenter mouseleave');
        },
        stop: function(event, ui) {
            $(this).offset(originalPosition2);
            if ($(this).css('opacity') != '0'){
                $(this).css("background-image", "url(../image/standM.png)");
                $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", false);
                addSingerHover()
            }
            else if ($(this).css('opacity') == '0'){    // 드래그 불가 힌트용 이미지 변경
                setTimeout(function(){
                    $("#singerBox1").css("background-image", "url(../image/deadD.png)");
                    $("#singerBox3").css("background-image", "url(../image/deadR.png)");
                }, 200)
            }
        }
    });
    $( "#singerBox3" ).draggable({ 
        revert: "invalid",
        start: function(event, ui) {
            stopSingerHoverEffect("#singerBox3");
            originalPosition3 = ui.helper.offset();
            $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", true);
            $("#singerBox1, #singerBox2, #singerBox3").off('mouseenter mouseleave');
        },
        stop: function(event, ui) {
            $(this).offset(originalPosition3);
            if ($(this).css('opacity') != '0'){
                $(this).css("background-image", "url(../image/standR.png)");
                $("#singerBox1, #singerBox2, #singerBox3").draggable("option", "disabled", false);
                addSingerHover()
            }
            else if ($(this).css('opacity') == '0'){
                setTimeout(function(){
                    $("#singerBox1").css("background-image", "url(../image/deadD.png)");
                    $("#singerBox2").css("background-image", "url(../image/deadM.png)");
                }, 200)
            }
        }
    });

    $( "#songBox1" ).draggable({
        revert: "invalid",
        start: function(event, ui) {
            // 중지되지 않은 애니메이션을 완전히 중지
            stopHoverEffect("#songBox1");
            originalPosition4 = ui.helper.offset();
            $("#songShadow1").css('transform', 'scale(0.2,0.2)')
            setTimeout(function(){
                $("#songShadow1").css('opacity', '0')
            }, 300)
            $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", true);
            $('#songBox1, #songBox2, #songBox3').off('mouseenter mouseleave');
        },
        stop: function(event, ui) {
            $(this).offset(originalPosition4);
            if ($(this).css('opacity') != '0'){
                $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", false);
                addHover()
                $("#songShadow1").css('opacity', '1')
                $("#songShadow1").css('transform', 'scale(1, 1)')
            }
            else if ($(this).css('opacity') == '0'){
                magaeClose2()
                magaeClose3()

            }
        }
    });
    $( "#songBox2" ).draggable({
        revert: "invalid",
        start: function(event, ui) {
            // 중지되지 않은 애니메이션을 완전히 중지
            stopHoverEffect("#songBox2");

            originalPosition5 = ui.helper.offset();
            $("#songShadow2").css('transform', 'scale(0.2,0.2)')
            setTimeout(function(){
                $("#songShadow2").css('opacity', '0')
            }, 300)
            $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", true);
            $('#songBox1, #songBox2, #songBox3').off('mouseenter mouseleave');
        },
        stop: function(event, ui) {
            $(this).offset(originalPosition5);
            if ($(this).css('opacity') != '0'){
                $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", false);
                addHover()
                $("#songShadow2").css('opacity', '1')
                $("#songShadow2").css('transform', 'scale(1, 1)')
            }
            else if ($(this).css('opacity') == '0'){
                magaeClose1()
                magaeClose3()
            }
        }
    });
    $( "#songBox3" ).draggable({
        revert: "invalid",
        start: function(event, ui) {
            // 중지되지 않은 애니메이션을 완전히 중지
            stopHoverEffect("#songBox3");

            originalPosition6 = ui.helper.offset();
            $("#songShadow3").css('transform', 'scale(0.2,0.2)')
            setTimeout(function(){
                $("#songShadow3").css('opacity', '0')
            }, 300)
            $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", true);
            $('#songBox1, #songBox2, #songBox3').off('mouseenter mouseleave');
        },
        stop: function(event, ui) {
            $(this).offset(originalPosition6);
            if ($(this).css('opacity') != '0'){
                $("#songBox1, #songBox2, #songBox3").draggable("option", "disabled", false);
                addHover()
                $("#songShadow3").css('opacity', '1')
                $("#songShadow3").css('transform', 'scale(1, 1)')
            }
            else if ($(this).css('opacity') == '0'){
                magaeClose1()
                magaeClose2()
            }
        }
    });
    let singer_name
    let song_mood
    let firstTime = true    // 페이지 로드되고 플레이어 처음 생성될때(폰트 처음 불러와서 깨지는 느낌 방지용)

    $( "#beaker_cover" ).droppable({
        accept: "#singerBox1, #singerBox2, #singerBox3, #songBox1, #songBox2, #songBox3",
        drop: function( event, ui ) {
            // console.log(ui.draggable[0].id) // 드랍한 요소 id 확인
            if(ui.draggable[0].id == "singerBox1"){
                $("#singerBox1").css("opacity", "0");
                $("#singerBox1").css("background-image", "url(../image/standD.png)");
                $("#singer1").attr("src", "../image/floatD.png");    // 비커 안에 캐릭터 이미지 변경 

                stopSingerMove()    // 둥둥떠다니는거 잠시 멈춰(위에서 떨어지는 애니메이션 써야됨)
                setTimeout(function(){
                    falling()   // 비커 내부로 캐릭터 떨궈지는 애니메이션 함수
                }, 100)
                setTimeout(function(){
                    $('#singer1').css('transition', 'margin-top 1s linear');    // 비커 안에서 둥둥떠다닐떄 트랜지션 리니어로 줌
                    stopSinger = false
                    animate2(); // 둥둥떠다니는 애니메이션 다시 실행
                }, 1100)
                singer_name = "dragon";
            }
            else if(ui.draggable[0].id == "singerBox2"){
                $("#singerBox2").css("opacity", "0");
                $("#singerBox2").css("background-image", "url(../image/standM.png)");
                $("#singer1").attr("src", "../image/floatM.png");
                
                stopSingerMove()    // 둥둥떠다니는거 잠시 멈춰(위에서 떨어지는 애니메이션 써야됨)
                setTimeout(function(){
                    falling()   // 비커 내부로 캐릭터 떨궈지는 애니메이션 함수
                }, 100)
                setTimeout(function(){
                    $('#singer1').css('transition', 'margin-top 1s linear');    // 비커 안에서 둥둥떠다닐떄 트랜지션 리니어로 줌
                    stopSinger = false
                    animate2(); // 둥둥떠다니는 애니메이션 다시 실행
                }, 1100)

                singer_name = "monkey";
            }
            else if(ui.draggable[0].id == "singerBox3"){
                $("#singerBox3").css("opacity", "0");
                $("#singerBox3").css("background-image", "url(../image/standR.png)");
                $("#singer1").attr("src", "../image/floatR.png");
                
                stopSingerMove()    // 둥둥떠다니는거 잠시 멈춰(위에서 떨어지는 애니메이션 써야됨)
                setTimeout(function(){
                    falling()   // 비커 내부로 캐릭터 떨궈지는 애니메이션 함수
                }, 100)
                setTimeout(function(){
                    $('#singer1').css('transition', 'margin-top 1s linear');    // 비커 안에서 둥둥떠다닐떄 트랜지션 리니어로 줌
                    stopSinger = false
                    animate2(); // 둥둥떠다니는 애니메이션 다시 실행
                }, 1100)

                singer_name = "rabbit";
            }
            if(ui.draggable[0].id == "songBox1"){
                song_mood = "dark"
                $( "#songBox1" ).css("opacity", "0");
                $("#dropP1").css("background-image", "url(../image/dropColorB1.png)");
                $("#dropP1").css("display", "block");
                setTimeout(function(){
                    $("#dropP1").css("display", "none");
                    $("#dropP2").css("background-image", "url(../image/dropColorB2.png)");
                    $("#dropP2").css("display", "block");
                }, 400)
                stopAnimation()
                setTimeout(function(){
                    stopAnimationFlag = false;
                    makeWave("black");
                    $(".bubble").css("background-color", "#A9B0B4");
                }, 900)
                setTimeout(function(){
                    $("#dropP2").css("display", "none");
                }, 1000)

            }
            else if(ui.draggable[0].id == "songBox2"){
                song_mood = "love"
                $( "#songBox2" ).css("opacity", "0");
                $("#dropP1").css("background-image", "url(../image/dropColorP1.png)");
                $("#dropP1").css("display", "block");
                setTimeout(function(){
                    $("#dropP1").css("display", "none");
                    $("#dropP2").css("background-image", "url(../image/dropColorP2.png)");
                    $("#dropP2").css("display", "block");
                }, 400)
                stopAnimation()
                setTimeout(function(){
                    stopAnimationFlag = false;
                    makeWave("pink");
                    $(".bubble").css("background-color", "#FFDDE3");
                }, 900)
                setTimeout(function(){
                    $("#dropP2").css("display", "none");
                }, 1000)
            }
            else if(ui.draggable[0].id == "songBox3"){
                song_mood = "bright"
                $( "#songBox3" ).css("opacity", "0");
                $("#dropP1").css("background-image", "url(../image/dropColorY1.png)");
                $("#dropP1").css("display", "block");
                setTimeout(function(){
                    $("#dropP1").css("display", "none");
                    $("#dropP2").css("background-image", "url(../image/dropColorY2.png)");
                    $("#dropP2").css("display", "block");
                }, 400)
                stopAnimation()
                setTimeout(function(){
                    stopAnimationFlag = false;
                    makeWave("yellow");
                    $(".bubble").css("background-color", "#FFF1C1");
                }, 900)
                setTimeout(function(){
                    $("#dropP2").css("display", "none");
                }, 1000)
            }   // 가수 하나 색상 하나 선택하게 제한해야됨.
            let count = 0
            for(let i = 1; i < 4; i++){
                let singer_id = "#singerBox" + i
                let song_id = "#songBox" + i
                if($(singer_id).css("opacity") == "0"){
                    count += 1
                }
                if($(song_id).css("opacity") == "0"){
                    count += 1
                }
            }
            if(count == 2){ // 비커에 요소 두개가 들어와있으면 노래 재생
                $("#beaker_cover").css("cursor", "pointer");
                if(currentAudio.paused == true){$('#play_button').attr("src", "../image/pauseBtn.png");}
                for(let i in audios){
                    if(audios[i].singerN == singer_name){
                        if(audios[i].songM == song_mood){
                            let audio   = new Audio(audios[i].audio)
                            let title   = audios[i].title
                            let author  = audios[i].author

                            $("#current_song").text(title);
                            $("#current_singer").text(author);

                            setTimeout(function(){
                                if(firstTime){
                                    firstTime = false
                                    $("#player_container").css("opacity", "0");
                                    $("#player_container").css("display", "block");
                                    setTimeout(function(){
                                        console.log("실행됨")
                                        $("#player_container").css("opacity", "1");
                                    }, 100)
                                }
                                else{
                                    $("#player_container").css("display", "block");
                                }

                                currentAudio.pause()
                                currentAudio = audio
                                currentAudio.currentTime = 0;
                                currentAudio.volume = 0.3;  // 음악 소리 30퍼센트로 조절
                                currentAudio.play()
                                isTwo = true
                                clickPossible = true    // 비커 안에 요소 두개 들어왔으니 이제 클릭 가능!
                            }, 1100)
                        }
                    }
                }
            }
            
        }
    });
    function explodeSong() {
        flySinger()
        $("#beaker_back").animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '0deg' }, 50);
        $("#beaker_cover").animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '-10deg' }, 100).animate({ rotate: '10deg' }, 100).animate({ rotate: '0deg' }, 50);
    }

    function runEffect() {

        stopAnimation()  // 비커 내부 물결 잠시 중지!!

        stopSingerMove()    // 둥둥떠다니는거 잠시 멈춰(위에서 떨어지는 애니메이션 써야됨)
        
        setTimeout(function(){  
            explodeSong()
        }, 500) 
        setTimeout(function(){  // 노래 종료, 플레이어 숨김
            $("#singer1").css("opacity", "0")
            currentAudio.pause()    
            $("#player_container").css("display", "none");
        }, 1500)    
        
        for(let i = 1; i < 4; i++){ 
            let singer_id = "#singerBox" + i
            let song_id = "#songBox" + i
            if($(singer_id).css("opacity") == "0"){ // 캐릭터 아이템 보충
                setTimeout(function(){
                    stopAnimationFlag = false;
                    makeWave();
                    $(".bubble").css("background-color", "#D6EFFF");
                    $(singer_id).animate({'margin-top': -200}, 0)
                    $(singer_id).css("opacity", "100")
                    $(singer_id).animate({'margin-top': 0}, 200)
                }, 1700)
            }
            if($(song_id).css("opacity") == "0"){   // 물병 아이템 보충
                setTimeout(function(){
                    $(song_id).animate({'margin-top': -200}, 0)
                    $(song_id).css("opacity", "100")
                    $(song_id).animate({'margin-top': 0}, 200)
                    if(song_id == "#songBox1"){
                        $("#songShadow1").css('opacity', '1')
                        $("#songShadow1").css('transform', 'scale(1, 1)')
                        magaeOpen2()
                        magaeOpen3()
                    }
                    else if(song_id == "#songBox2"){
                        $("#songShadow2").css('opacity', '1')
                        $("#songShadow2").css('transform', 'scale(1, 1)')
                        magaeOpen1()
                        magaeOpen3()
                    }
                    else if(song_id == "#songBox3"){
                        $("#songShadow3").css('opacity', '1')
                        $("#songShadow3").css('transform', 'scale(1, 1)')
                        magaeOpen1()
                        magaeOpen2()
                    }
                }, 1700)
            }
        }
        setTimeout(function(){  // 비커에 들어갔던 캐릭터가 다시 돌아오게 되면 드래그 불가 해제
            $("#singerBox1, #singerBox2, #singerBox3, #songBox1, #songBox2, #songBox3").draggable("option", "disabled", false);
            $("#singerBox1").css("background-image", "url(../image/standD.png)");
            $("#singerBox2").css("background-image", "url(../image/standM.png)");
            $("#singerBox3").css("background-image", "url(../image/standR.png)");
            addHover()
            addSingerHover()
        }, 2000)    // 드래그 불가시간 넉넉하게 2초로 둠
    };



    let clickPossible = false
    $( "#beaker_cover" ).on( "click", function() {
        if(clickPossible){
            clickPossible = false   // 비커 요소들을 모두 비웠으니 이제 비커 클릭 불가능!
            isTwo = false   // 호버도 안됨~
            $("#beaker_border").css("opacity", "0")
            $("#beaker_cover").css("cursor", "default");
            runEffect();

        }
        else if(!clickPossible){
            console.log("차단됨!!")
        }
        
        
    });

    let playerDisplay = false
    // 현재 재생중인 오디오
    let currentAudio = new Audio()

    let audios = [
        {
            singerN: 'dragon',
            songM: 'dark',
            audio: '../musics/GDragon  무제無題 Untitled.mp3',
            title: '무제',
            author: 'G-DRAGON'
        },
        {
            singerN: 'dragon',
            songM: 'love',
            audio: '../musics/GDragon 삐딱하게.mp3',
            title: '삐딱하게',
            author: 'G-DRAGON'
        },
        {
            singerN: 'dragon',
            songM: 'bright',
            audio: '../musics/GDragon Crayon 크레용.mp3',
            title: 'Crayon 크레용',
            author: 'G-DRAGON'
        },
        {
            singerN: 'monkey',
            songM: 'dark',
            audio: '../musics/잔나비 - 주저하는 연인들을 위해.mp3',
            title: '주저하는 연인들을 위해',
            author: '잔나비'
        },
        {
            singerN: 'monkey',
            songM: 'love',
            audio: '../musics/잔나비 - 사랑하긴 했었나요.mp3',
            title: '사랑하긴 했었나요',
            author: '잔나비'
        },
        {
            singerN: 'monkey',
            songM: 'bright',
            audio: '../musics/잔나비 - 알록달록.mp3',
            title: '알록달록',
            author: '잔나비'
        },
        {
            singerN: 'rabbit',
            songM: 'dark',
            audio: '../musics/NewJeans - Ditto.mp3',
            title: 'Ditto',
            author: 'NewJeans'
        },
        {
            singerN: 'rabbit',
            songM: 'love',
            audio: '../musics/NewJeans - Super Shy.mp3',
            title: 'Super Shy',
            author: 'NewJeans'
        },
        {
            singerN: 'rabbit',
            songM: 'bright',
            audio: '../musics/NewJeans - Hype Boy.mp3',
            title: 'Hype Boy',
            author: 'NewJeans'
        }
    ]
    // 현재 시간 얻기
    setInterval(function(){
        let minutes = Math.floor(currentAudio.currentTime / 60);
        let seconds = Math.floor(currentAudio.currentTime % 60);
        let timeString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        $('#current_time').text(timeString);
        minutes = Math.floor(currentAudio.duration / 60);
        seconds = Math.floor(currentAudio.duration % 60);
        timeString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        $('#total_time').text(timeString);

        if($('#current_time').text() == $('#total_time').text()){
            setTimeout(function(){
                currentAudio.currentTime = 0
                $('#play_button').attr("src", "../image/playBtn.png");
            }, 1000)
        }

        let barWidth = $('#current_bar').innerWidth();
        $('#current_bar > div').css('width', barWidth * currentAudio.currentTime / currentAudio.duration )
        
        $('#current_bar > div > div').css('left', (Number($('#current_bar').css('margin-left').slice(0,-2)) + Number($('#current_bar > div').css('width').slice(0,-2))) + 'px')
    }, 50)

    // 버튼 이벤트
    $('#play_button').click(function(){ // 재생/일시정지
        if(currentAudio.paused == true){
            currentAudio.play()
            $('#play_button').attr("src", "../image/pauseBtn.png");
            
        }
        else{
            currentAudio.pause()
            $('#play_button').attr("src", "../image/playBtn.png");
        }
    })
    $('#for10_button').click(function(){
        currentAudio.currentTime += 10
    })
    $('#back10_button').click(function(){
        currentAudio.currentTime -= 10
    })
    

});
