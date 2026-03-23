const totalPages = 37;
const flipbook = $("#flipbook");
const sound = document.getElementById("pageSound");

// 📄 페이지 생성 (중복 방지)
function createPages() {

  flipbook.html(""); // 🔥 핵심 (중복 제거)

  for (let i = 1; i <= totalPages; i++) {
    flipbook.append(`
      <div><img src="./images/page${i}.jpg"></div>
    `);
  }

  // 홀수 페이지 보정
  if (totalPages % 2 !== 0) {
    flipbook.append(`<div></div>`);
  }
}

// 📱 모바일 체크
function isMobile() {
  return window.innerWidth < 768;
}

// 📖 flipbook 초기화
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

    duration: 1200,        // 🔥 넘김 부드럽게
    gradients: true,
    elevation: 80,         // 🔥 입체감 강화

    when: {

      // 🔊 페이지 넘김 소리
      turning: function () {
        if (sound) {
          sound.currentTime = 0;
          sound.play().catch(() => {});
        }
      },

      // ✨ 넘긴 후 자연스러운 느낌
      turned: function () {
        $("#flipbook").css("transition", "transform 0.3s ease");
      }
    }
  });
}

// 🚀 완전 안정 실행
$(window).on("load", function () {

  createPages(); // 먼저 생성

  setTimeout(() => {
    initFlipbook(); // 그 다음 실행
  }, 300);

});

// ▶ 다음
function nextPage() {
  flipbook.turn("next");
}

// ◀ 이전
function prevPage() {
  flipbook.turn("previous");
}

// 🖱 마우스 휠 넘김
window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    flipbook.turn("next");
  } else {
    flipbook.turn("previous");
  }
});

// 🖱 드래그 UX 개선
$("#flipbook").on("mousedown touchstart", function () {
  $(this).css("cursor", "grabbing");
});

$("#flipbook").on("mouseup touchend", function () {
  $(this).css("cursor", "grab");
});