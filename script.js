const totalPages = 37;
const flipbook = $("#flipbook");
const sound = document.getElementById("pageSound");

// 페이지 생성
function createPages() {
  for (let i = 1; i <= totalPages; i++) {
    flipbook.append(`<div><img src="./images/page${i}.jpg"></div>`);
  }

  if (totalPages % 2 !== 0) {
    flipbook.append(`<div></div>`);
  }
}

// 모바일 체크
function isMobile() {
  return window.innerWidth < 768;
}

// 초기화
function initFlipbook() {

  const width = isMobile()
    ? window.innerWidth * 0.95
    : window.innerWidth * 0.9;

  const height = isMobile()
    ? window.innerHeight * 0.85
    : window.innerHeight * 0.9;

  flipbook.turn({
    width,
    height,
    autoCenter: true,
    display: isMobile() ? "single" : "double",

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

// 완전 안전 실행 (🔥 핵심)
$(window).on("load", function () {

  createPages();

  setTimeout(() => {
    initFlipbook();
  }, 300);

});

// 버튼
function nextPage() {
  $("#flipbook").turn("next");
}

function prevPage() {
  $("#flipbook").turn("previous");
}