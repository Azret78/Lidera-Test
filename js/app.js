// TODO SLIDERS

if (document.querySelector(".why-slider")) {
  const swiper = new Swiper(".why-slider", {
    navigation: {
      nextEl: ".swiper-button-next--why",
      prevEl: ".swiper-button-prev--why",
    },
    pagination: {
      el: ".swiper-pagination--why",
      clickable: true,
    },
    effect: "slide",
    slidesPerView: 4,
    spaceBetween: "24",
    slideToClickedSlide: false,
    initialSlide: 0,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    loop: false,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: "24",
      },
      850: {
        slidesPerView: 3,
        spaceBetween: "16",
      },
      650: {
        slidesPerView: 2,
        spaceBetween: "16",
      },
      400: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  function updateSlidesOpacity() {
    const allSlides = swiper.slides;
    const spv = Math.floor(swiper.params.slidesPerView);
    const startIndex = swiper.activeIndex;
    const endIndex = startIndex + spv - 1;
    allSlides.forEach((slide, index) => {
      if (index >= startIndex && index <= endIndex) {
        slide.style.boxShadow = "0px 10px 20px 0px #12112714";
      } else {
        slide.style.boxShadow = "none";
      }
    });
  }
  updateSlidesOpacity();
  swiper.on("slideChange", updateSlidesOpacity);
  swiper.on("breakpoint", updateSlidesOpacity);
}

const burger = document.querySelector(".header__menu");

function activeBurger() {
  const headerBody = document.querySelector(".header__body");
  const body = document.querySelector("body");
  burger.classList.toggle("_active");
  headerBody.classList.toggle("_active");
  if (
    body.classList.contains("_hidden") === false &&
    burger.classList.contains("_active") === true
  ) {
    body.classList.add("_hidden");
  } else {
    body.classList.remove("_hidden");
  }
}

burger.addEventListener("click", () => {
  activeBurger();
});

// TODO ANIM

const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

// TODO ICON

const icons = document.querySelectorAll("._icon");

icons.forEach((icon) => {
  const img = icon.querySelector("img");
  if (img && img.src) {
    const src = img.src;
    if (src.includes("fb")) {
      icon.classList.add("fb");
    }
    if (src.includes("tw")) {
      icon.classList.add("tw");
    }
    if (src.includes("gh")) {
      icon.classList.add("gh");
    }
    if (src.includes("insta")) {
      icon.classList.add("insta");
    }
  }
});

//TODO POPUP

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  document.querySelectorAll('a[href^="#popup"]').forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetPopup = document.getElementById(targetId);

      if (targetPopup) {
        const burgerMenu = document.querySelector(".burger__menu");
        const headerInner = document.querySelector(".header__inner");

        if (burgerMenu && burgerMenu.classList.contains("_active")) {
          burgerMenu.classList.remove("_active");
        }

        if (headerInner && headerInner.classList.contains("_active")) {
          headerInner.classList.remove("_active");
        }

        targetPopup.classList.add("_active");
        body.classList.add("_hidden");
      }
    });
  });

  document.querySelectorAll(".popup__close").forEach((closeButton) => {
    closeButton.addEventListener("click", function () {
      const activePopup = this.closest("._active");

      if (activePopup) {
        activePopup.classList.remove("_active");
        body.classList.remove("_hidden");
      }
    });
  });
});

// TODO VIDEO

const video = document.querySelector("#custom-video");
const playPauseButton = document.querySelector(".play-pause");

playPauseButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (video.paused) {
    video.play();
    playPauseButton.classList.add("_play");
    playPauseButton.classList.remove("_pause");
  } else {
    video.pause();
    playPauseButton.classList.add("_pause");
    playPauseButton.classList.remove("_play");
  }
});

setInterval(() => {
  if (video.paused) {
    playPauseButton.classList.add("_pause");
    playPauseButton.classList.remove("_play");
  } else {
    playPauseButton.classList.add("_play");
    playPauseButton.classList.remove("_pause");
  }
}, 500);

// TODO ОТКРЫТИЕ POPUP НА ПОЛОВИНЕ ВИДЕО

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector("#popup-1");

  let popupShown = false;

  video.addEventListener("loadedmetadata", function () {
    const halfDuration = video.duration / 2;

    video.addEventListener("timeupdate", function () {
      if (
        video.currentTime >= halfDuration &&
        !popup.classList.contains("_active") &&
        !popupShown
      ) {
        popup.classList.add("_active");
        popupShown = true;
        video.pause();
        playPauseButton.classList.add("_pause");
        playPauseButton.classList.remove("_play");
      }
    });
  });
});

// TODO ANIMATION

if (window.innerWidth >= 768) {
  function animateObjects() {
    const time = Date.now();

    document.querySelectorAll(".object").forEach(function (move) {
      const movingValue = move.getAttribute("data-value");
      const x = Math.sin(time * 0.001 * movingValue) * 20;
      const y = Math.cos(time * 0.001 * movingValue) * 20;

      move.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });

    requestAnimationFrame(animateObjects);
  }

  animateObjects();
}

// TODO ОБЁРТКА В SPAN

const titleElement = document.querySelector(".service__title h2");

setTimeout(() => {
  const words = titleElement.textContent.trim().split(" ");
  if (words.length > 3) {
    const lastThreeWords = words.slice(-3).join(" ");
    const wrappedWords = `<span>${lastThreeWords}</span>`;
    titleElement.innerHTML = words.slice(0, -3).join(" ") + " " + wrappedWords;
  }
}, 500);
