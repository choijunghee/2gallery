const totalPages = 37;
const flipbook = $("#flipbook");
const sound = document.getElementById("pageSound");

// 📄 페이지 생성 (중복 방지 포함)
function createPages() {

  flipbook.html(""); // 🔥 핵심 (중복 제거)

  for (let i = 1; i <= totalPages; i++) {
    flipbook.append(`<div><img src="./images/page${i}.jpg"></div>`);
  }

  if (totalPages % 2 !== 0) {
    flipbook.append(`<div></div>`);
  }
}

// 📱 모바일 체크
function isMobile() {
  return window.innerWidth < 768;
}

// 📖 flipbook 실행
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

    // 🔊 소리
    when: {
      turning: function () {
        if (sound) {
          sound.currentTime = 0;
          sound.play().catch(() => {});
        }
      }
    }
  });
}

// 🚀 완전 안정 실행 (핵심)
$(window).on("load", function () {

  createPages(); // 먼저 페이지 생성

  setTimeout(() => {
    initFlipbook(); // 그 다음 실행
  }, 300);

});

// ▶ 버튼
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