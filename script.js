const totalPages = 37;
const flipbook = $("#flipbook");
const sound = document.getElementById("pageSound");

// 📄 페이지 생성
for (let i = 1; i <= totalPages; i++) {
  flipbook.append(`
    <div><img src="./images/page${i}.jpg"></div>
  `);
}

// 홀수 페이지 보정
if (totalPages % 2 !== 0) {
  flipbook.append(`<div></div>`);
}

// 📱 모바일 체크
function isMobile() {
  return window.innerWidth < 768;
}

// 📖 초기화
function initFlipbook() {

  const width = isMobile()
    ? window.innerWidth * 0.95
    : window.innerWidth * 0.9;

  const height = isMobile()
    ? window.innerHeight * 0.85
    : window.innerHeight * 0.9;

  flipbook.turn({
    width: width,
    height: height,
    autoCenter: true,
    display: isMobile() ? "single" : "double",
    duration: 800,
    gradients: true,
    elevation: 50,

    // 🔥 페이지 넘길 때 소리
    when: {
      turning: function () {
        sound.currentTime = 0;
        sound.play();
      }
    }
  });
}

// 🔄 재로드
function reloadFlipbook() {
  if (flipbook.data("turn")) {
    flipbook.turn("destroy");
  }
  initFlipbook();
}

// 🚀 실행
$(document).ready(function () {
  initFlipbook();
});

// 반응형
window.addEventListener("resize", reloadFlipbook);

// 버튼
function nextPage() {
  flipbook.turn("next");
}

function prevPage() {
  flipbook.turn("previous");
}

// 🖱 마우스 휠
window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    flipbook.turn("next");
  } else {
    flipbook.turn("previous");
  }
});

// 🔥 드래그 지원 (핵심)
$("#flipbook").on("mousedown touchstart", function () {
  $(this).css("cursor", "grabbing");
});

$("#flipbook").on("mouseup touchend", function () {
  $(this).css("cursor", "grab");
});