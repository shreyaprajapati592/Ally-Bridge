// Header Menu JS

jQuery(document).ready(function () {
  jQuery(".mobileIcon").click(function () {
    jQuery("body").toggleClass("menu-open");
  });
});

// Sticky Menu JS
function toggleMenuClass() {
  if (window.scrollY > 50) {
    document.body.classList.add("menu-scrolled");
  } else {
    document.body.classList.remove("menu-scrolled");
  }
}
window.addEventListener("scroll", toggleMenuClass);
window.addEventListener("load", toggleMenuClass);

// hero swiper
var heroSwiper = new Swiper(".hero_swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  speed: 1200,
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
});

// Scroll Down
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".scroll_down");

  if (!scrollBtn) return;

  scrollBtn.addEventListener("click", function () {
    const currentSection = this.closest("section");
    const nextSection = currentSection?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// counter Js
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter_box .h2_big");
  let started = false;

  function animateCounter(counter) {
    const html = counter.innerHTML;

    const numberMatch = html.match(/([\d.]+)/);
    if (!numberMatch) return;

    const number = parseFloat(numberMatch[1]);
    const before = html.slice(0, numberMatch.index);
    const after = html.slice(numberMatch.index + numberMatch[1].length);

    let current = 0;
    const duration = 1500;
    const steps = 60;
    const increment = number / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      current += increment;

      if (step >= steps) {
        counter.innerHTML = before + numberMatch[1] + after;
        clearInterval(interval);
      } else {
        counter.innerHTML =
          before +
          (Number.isInteger(number)
            ? Math.floor(current)
            : current.toFixed(1)) +
          after;
      }
    }, duration / steps);
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 120 && !started) {
      counters.forEach(animateCounter);
      started = true;
    }
  });
});

// portfolio_swiper
document.addEventListener("DOMContentLoaded", function () {
  const el = document.querySelector(".portfolio_swiper");
  if (!el) return;

  const swiper = new Swiper(".portfolio_swiper", {
    slidesPerView: 6,
    loop: true,
    spaceBetween: 70,
    allowTouchMove: false,
    breakpoints: {
      1440: {
        slidesPerView: 6,
        spaceBetween: 70,
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 45,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 35,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      479: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      374: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });

  let paused = false;
  const speed = 0.8;

  function animate() {
    if (!paused) {
      let t = swiper.getTranslate() - speed;
      if (Math.abs(t) > swiper.wrapperEl.scrollWidth / 2) t = 0;
      swiper.setTranslate(t);
    }
    requestAnimationFrame(animate);
  }
  animate();

  el.addEventListener("mouseenter", () => (paused = true));
  el.addEventListener("mouseleave", () => (paused = false));
});

// gsap.registerPlugin(ScrollTrigger);

// const cards = gsap.utils.toArray(".vartical_card");
// const gap = 30;
// const exitDistance = 500;

// // Initial visible stacked state
// cards.forEach((card, i) => {
//   gsap.set(card, {
//     y: i * gap,
//     zIndex: cards.length - i
//   });
// });

// const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".we_are",
//     start: "top top",
//     end: "+=" + (cards.length * 300 + exitDistance),
//     scrub: true,
//     pin: true
//   }
// });

// /* STEP 1: Stack cards one by one */
// cards.slice(1).forEach((card, i) => {
//   tl.to(card, { y: 0, ease: "none" }, i);
// });

// /* STEP 2: Move entire stack upward together */
// tl.to(cards, {
//   y: -exitDistance,
//   ease: "none"
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const section = document.querySelector(".we_are");
//   const cards = [...document.querySelectorAll(".vertical_card")];

//   const startTop = 0;
//   const halfOffset = 120;

//   function setTops(tops) {
//     cards.forEach((card, i) => {
//       card.style.top = `${tops[i]}px`;
//     });
//   }

//   function onScroll() {
//     const progress = -section.getBoundingClientRect().top;

//     // DEFAULT (initial half stack)
//     let tops = cards.map((_, i) => startTop + i * halfOffset);

//     if (progress > 200) {
//       // Card 3 half-stacks on Card 2
//       tops[2] = startTop + halfOffset;
//       tops[3] = startTop + halfOffset;
//     }

//     if (progress > 300) {
//       // Card 4 FULL stacks on Card 3
//       tops[3] = startTop + halfOffset;
//     }

//     if (progress > 400) {
//       // FINAL: all stack on Card 1
//       tops = tops.map(() => startTop);
//     }
//     setTops(tops);
//   }

//   window.addEventListener("scroll", onScroll);
// });

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".we_are");
  const cards = document.querySelectorAll(".vartical_card");

  if (!section || !cards.length) return;

  let applied = false;
  let maxHeight = 0;

  function getStartTop() {
    const w = window.innerWidth;
    if (w < 767) return 110;
    if (w < 1024) return 120;
    if (w < 1300) return 125;
    return 140;
  }

  function getStackOffset() {
    const w = window.innerWidth;
    if (w < 767) return 90;
    if (w < 1024) return 100;
    if (w < 1300) return 110;
    return 110;
  }

  let startTop = getStartTop();
  let stackOffset = getStackOffset();

  // equal card height
  cards.forEach((card) => {
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });

  cards.forEach((card) => {
    card.style.height = `${maxHeight}px`;
  });

  function applyStack() {
    cards.forEach((card, index) => {
      card.style.top = `${startTop + index * stackOffset}px`;
    });
  }

  function handleScroll() {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 0 && !applied) {
      applied = true;
      applyStack();
    }

    // OPTIONAL: unstack when scrolling up
    if (sectionTop > 0 && applied) {
      applied = false;
      cards.forEach((card) => {
        card.style.top = `${startTop}px`;
      });
    }
  }

  window.addEventListener("resize", () => {
    startTop = getStartTop();
    stackOffset = getStackOffset();
    if (applied) applyStack();
  });

  window.addEventListener("scroll", handleScroll);
});

// Differentiated Investment  Accordian
$(document).on("click", ".investment_box_title", function () {
  const $parent = $(this).closest(".differentiated_investment_box");
  const $desc = $parent.find(".investment_box_desc");

  // Close others
  $(".differentiated_investment_box")
    .not($parent)
    .removeClass("active")
    .find(".investment_box_desc")
    .slideUp(300);

  // Toggle current
  $parent.toggleClass("active");
  $desc.stop(true, true).slideToggle(300);
});

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".dna_swiper", {
    slidesPerView: 2,
    spaceBetween: 45,
    speed: 600,

    pagination: {
      el: ".dna-progress .swiper-pagination",
      type: "progressbar",
    },

    grabCursor: true,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab_btn");
  const sections = document.querySelectorAll(".team_content_btm .leadership");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // active class switch
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter;

      sections.forEach((section) => {
        if (filter === "all" || section.dataset.category === filter) {
          section.style.display = "flex";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const popupSecond = document.querySelector(".team_details_second_box");
  const popupDefault = document.querySelector(".team_details_default_box");

  document.addEventListener("click", function (e) {
    // First popup
    if (e.target.closest(".team_card")) {
      popupSecond.classList.add("active");
      document.body.style.overflow = "hidden";
      document.body.classList.add("popup-open");
    }

    // Second popup
    if (e.target.closest(".team_card2") || e.target.closest(".operations")) {
      popupDefault.classList.add("active");
      document.body.style.overflow = "hidden";
      document.body.classList.add("popup-open");
    }

    // Close popup
    if (e.target.closest(".close_menu")) {
      popupSecond.classList.remove("active");
      popupDefault.classList.remove("active");
      document.body.style.overflow = "";
      document.body.classList.remove("popup-open");
    }
  });
});

const swiperRightToLeft = new Swiper(".right-to-left", {
  slidesPerView: "auto",
  spaceBetween: 100,
  loop: true,
  speed: 4000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    1200: {
      slidesPerView: "auto",
      spaceBetween: 100,
    },
    1024: {
      spaceBetween: 90,
    },
    900: {
      spaceBetween: 80,
    },
    767: {
      spaceBetween: 70,
    },
    600: {
      spaceBetween: 60,
    },
    479: {
      spaceBetween: 50,
    },
    374: {
      spaceBetween: 40,
    },
    0: {
      spaceBetween: 30,
    },
  },
  freeMode: {
    enabled: true,
    momentum: false,
  },
  allowTouchMove: false,
});
