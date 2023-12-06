const allRects = document.querySelectorAll(".astronaut, .earth, .moon, .universe");
const darkenLayer = document.querySelector(".darken");
const modal = document.querySelector(".modal");
let isEnlarged = false;
let originalZIndex = "";


allRects.forEach(function (rect) {
    rect.addEventListener("click", function () {
    if (!isEnlarged) {
        const currentTransform = window.getComputedStyle(this).getPropertyValue("transform");
        this.style.transform = `${currentTransform} scale(1.1)`;
        modal.style.display = "block";
        isEnlarged = true;

        originalZIndex = this.style.zIndex;
        this.style.zIndex = "4";

        darkenLayer.style.display = "block";
        darkenLayer.style.zIndex = "3";
        darkenLayer.style.opacity = "0.6";

        allRects.forEach(function (otherRect) {
            if (otherRect !== rect) {
            otherRect.style.opacity = "1";
            }
        });

        } else {
            if (isEnlarged && this.style.zIndex === "4") {
            this.style.transform = "";
            modal.style.display = "none";
            isEnlarged = false;

            allRects.forEach(function (otherRect) {
            otherRect.style.opacity = "1";
            });

            darkenLayer.style.display = "none";
            this.style.zIndex = originalZIndex;
            }
        }

        
        // Universe, Earth, Moon, Astronaut에 따라 스타일 및 클래스 조작
        const modalBox = modal.querySelector(".modal_box");
        
        if (this.classList.contains("universe")) {
            modalBox.classList.remove("modal_box2");
            modalBox.classList.add("modal_box1");

            const uniTitle = this.querySelector(".uni_title");
            const uniTitle1 = this.querySelector(".uni_title1");

            if (uniTitle.style.display === "none") {
                uniTitle.style.display = "block";
                uniTitle1.style.display = "none";
            } else {
                uniTitle.style.display = "none";
                uniTitle1.style.display = "block";
            }

        } else if (this.classList.contains("earth")) {
            modalBox.classList.remove("modal_box2");
            modalBox.classList.add("modal_box1");
        
            const clouds = document.querySelector(".clouds");
            
            // 구름 애니메이션 작동 코드
            if (!clouds.classList.contains("animate")) {
                clouds.classList.add("animate");
            } else {
                clouds.classList.remove("animate");
            }

        } else if (this.classList.contains("moon")) {
            modalBox.classList.remove("modal_box1");
            modalBox.classList.add("modal_box2");

            const moTitle = this.querySelector(".mo_title");
            const moTitle1 = this.querySelector(".mo_title1");

            if (moTitle.style.display === "none") {
                moTitle.style.display = "block";
                moTitle1.style.display = "none";
            } else {
                moTitle.style.display = "none";
                moTitle1.style.display = "block";
            }

        
        } else if (this.classList.contains("astronaut")) {
            modalBox.classList.remove("modal_box1");
            modalBox.classList.add("modal_box2");

            const astronaut = document.querySelector(".ast");
            
            if (!astronaut.classList.contains("animate")) {
                astronaut.classList.add("animate");
            } else {
                astronaut.classList.remove("animate");
            }
        }
    });
});

const universe = document.querySelector(".universe");
const rocket = document.getElementById("uni_rocket");
let isFlying = false;

universe.addEventListener("click", function () {
  const randomTop = Math.random() * 80; // 랜덤한 top 위치 설정
  const randomLeft = Math.random() * 80; // 랜덤한 left 위치 설정

    if (!isFlying) {
        rocket.style.transition = "top 5s ease, left 5s ease"; // 트랜지션 효과 추가
        rocket.style.top = `${randomTop}%`;
        rocket.style.left = `${randomLeft}%`;
        isFlying = true;
    } else {
        rocket.style.transition = "top 5s ease, left 5s ease"; // 트랜지션 효과 추가
        rocket.style.top = "60%"; // 제자리로 돌아가는 위치
        rocket.style.left = "20%"; // 제자리로 돌아가는 위치
        isFlying = false;
    }
});

rocket.addEventListener("transitionend", function () {
  // 트랜지션이 끝날 때 원래 위치로 이동
    if (!isFlying) {
        rocket.style.transition = ""; // 트랜지션 초기화
        rocket.style.top = "60%";
        rocket.style.left = "20%";
    }
});

const earthpic = document.querySelector(".earth");
let isEarth1 = true;

earthpic.addEventListener("click", function() {
    isEarth1 = !isEarth1;
    if (isEarth1) {
        earthpic.style.backgroundImage = "url('resources/earth1.png')";
    } else {
        earthpic.style.backgroundImage = "url('resources/earth2.png')";
    }
});

const aspic = document.querySelector(".astronaut");
let isAst1 = true;

aspic.addEventListener("click", function() {
    isAst1 = !isAst1;
    if (isAst1) {
        aspic.style.backgroundImage = "url('resources/as_page.png')";
    } else {
        aspic.style.backgroundImage = "url('resources/as_page1.png')";
    }
});