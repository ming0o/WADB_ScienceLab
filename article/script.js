const allRects = document.querySelectorAll('.astronaut, .earth, .moon, .universe');
const darkenLayer = document.querySelector('.darken');
const modal = document.querySelector('.modal');
let isEnlarged = false;
let originalZIndex = '';

allRects.forEach(function (rect) {
    rect.addEventListener('click', function () {
        if (!isEnlarged) {
            const currentTransform = window.getComputedStyle(this).getPropertyValue('transform');
            this.style.transform = `${currentTransform} scale(1.1)`;
            modal.style.display = 'block';
            isEnlarged = true;

            originalZIndex = this.style.zIndex;
            this.style.zIndex = '4';

            darkenLayer.style.display = 'block';
            darkenLayer.style.zIndex = '3'; 
            darkenLayer.style.opacity = '0.6';

            allRects.forEach(function (otherRect) {
                if (otherRect !== rect) {
                    otherRect.style.opacity = '1';
                }
            });

        } else {
            if (isEnlarged && this.style.zIndex === '4') {
                this.style.transform = '';
                modal.style.display = 'none';
                isEnlarged = false;

                allRects.forEach(function (otherRect) {
                    otherRect.style.opacity = '1';
                });

                darkenLayer.style.display = 'none';
                this.style.zIndex = originalZIndex;
            }
        }

        // Universe 또는 Earth를 클릭했을 때 modal_box1 스타일 적용
        if (this.classList.contains('universe') || this.classList.contains('earth')) {
            modal.querySelector('.modal_box').classList.remove('modal_box2');
            modal.querySelector('.modal_box').classList.add('modal_box1');
        }
        // Moon 또는 Astronaut을 클릭했을 때 modal_box2 스타일 적용
        else if (this.classList.contains('moon') || this.classList.contains('astronaut')) {
            modal.querySelector('.modal_box').classList.remove('modal_box1');
            modal.querySelector('.modal_box').classList.add('modal_box2');
        }
        
        if (this.classList.contains('universe')) {
            const uniTitle = this.querySelector('.uni_title');
            if (uniTitle.classList.contains('uni_title1')) {
                uniTitle.classList.remove('uni_title1');
                uniTitle.classList.add('uni_title');
            } else if (uniTitle.classList.contains('uni_title')) {
                uniTitle.classList.remove('uni_title');
                uniTitle.classList.add('uni_title1');
            } 
        } else if (this.classList.contains('earth')) {
            const eaTitle = this.querySelector('.ea_title');
            eaTitle.classList.remove('ea_title');
            eaTitle.classList.add('ea_title1');
        }
    });
});

const universe = document.querySelector('.universe');
const rocket = document.getElementById('uni_rocket');
let isFlying = false;

universe.addEventListener('click', function () {
    const randomTop = Math.random() * 80; // 랜덤한 top 위치 설정
    const randomLeft = Math.random() * 80; // 랜덤한 left 위치 설정

    if (!isFlying) {
        rocket.style.transition = 'top 5s ease, left 5s ease'; // 트랜지션 효과 추가
        rocket.style.top = `${randomTop}%`;
        rocket.style.left = `${randomLeft}%`;
        isFlying = true;
    } else {
        rocket.style.transition = 'top 5s ease, left 5s ease'; // 트랜지션 효과 추가
        rocket.style.top = '60%'; // 제자리로 돌아가는 위치
        rocket.style.left = '20%'; // 제자리로 돌아가는 위치
        isFlying = false;
    }
});

rocket.addEventListener('transitionend', function () {
    // 트랜지션이 끝날 때 원래 위치로 이동
    if (!isFlying) {
        rocket.style.transition = ''; // 트랜지션 초기화
        rocket.style.top = '60%';
        rocket.style.left = '20%';
    }
});