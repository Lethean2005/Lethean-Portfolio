jQuery(document).ready(function () {
  "use strict";

  /*** Svg ***/

  function perker_svg() {
    jQuery("img.svg").each(function () {
      var jQueryimg = jQuery(this);
      var imgClass = jQueryimg.attr("class");
      var imgURL = jQueryimg.attr("src");

      jQuery.get(
        imgURL,
        function (data) {
          // Get the SVG tag, ignore the rest
          var jQuerysvg = jQuery(data).find("svg");

          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== "undefined") {
            jQuerysvg = jQuerysvg.attr("class", imgClass + " replaced-svg");
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          jQuerysvg = jQuerysvg.removeAttr("xmlns:a");

          // Replace image with new SVG
          jQueryimg.replaceWith(jQuerysvg);
        },
        "xml"
      );
    });
  }
  perker_svg();

  /*** Progress ***/

  function tdProgress(container) {
    container.find(".progress_inner").each(function (i) {
      var progress = jQuery(this);
      var pValue = parseInt(progress.data("value"), 10);
      var pColor = progress.data("color");
      var pBarWrap = progress.find(".bar");
      var pBar = progress.find(".bar_in");
      pBar.css({ width: pValue + "%", backgroundColor: pColor });
      setTimeout(function () {
        pBarWrap.addClass("open");
      }, i * 300);
    });
  }

  jQuery(".perker_progress").each(function () {
    var pWrap = jQuery(this);
    pWrap.waypoint({
      handler: function () {
        tdProgress(pWrap);
      },
      offset: "90%",
    });
  });

  /*** Images ***/

  function perker_images() {
    var data = jQuery("*[data-img-url]");

    data.each(function () {
      var element = jQuery(this);
      var url = element.data("img-url");
      element.css({ backgroundImage: "url(" + url + ")" });
    });
  }
  perker_images();

  /*** Hero Height ***/

  function perker_hero_height() {
    var WH = jQuery(window).height();
    var hero = jQuery(".perker_hero_wrap");

    hero.css({ height: WH });
  }
  perker_hero_height();

  /*** About Top ***/

  function perker_about_top() {
    var hero = jQuery(".perker_hero_wrap").height();
    var about = jQuery("#about");

    about.css({ marginTop: hero });
  }
  perker_about_top();

  /*** Menu Backgound ***/

  function perker_menu_bg() {
    jQuery(window).on("scroll", function () {
      var WinOffset = jQuery(window).scrollTop();
      var topBar = jQuery(".perker_topbar");
      if (WinOffset >= 500) {
        topBar.addClass("animate");
      } else {
        topBar.removeClass("animate");
      }
    });
  }
  perker_menu_bg();

  /*** Mobile Menu ***/

  function perker_mobile_menu() {
    var trigger = jQuery(".perker_topbar .trigger");
    var triggerMenu = jQuery(".perker_topbar .trigger .menu");
    var triggerClose = jQuery(".perker_topbar .trigger .close");
    var dropdown = jQuery(".perker_topbar .dropdown");

    trigger.on("click", function () {
      var element = jQuery(this);
      if (element.hasClass("opened")) {
        element.removeClass("opened");
        triggerMenu.removeClass("opened");
        triggerClose.removeClass("opened");
        dropdown.slideUp();
      } else {
        element.addClass("opened");
        triggerMenu.addClass("opened");
        triggerClose.addClass("opened");
        dropdown.slideDown();
      }
      return false;
    });
  }
  perker_mobile_menu();

  /*** Anchor ***/

  function perker_anchor() {
    jQuery(
      ".perker_topbar .menu ul li a,.perker_topbar .dropdown .main ul li a"
    )
      .off()
      .on("click", function (e) {
        e.stopPropagation();
        var element = jQuery(this);
        var url = element.attr("href");
        if (url !== "#" && url.charAt(0) === "#") {
          $("html, body").animate(
            {
              scrollTop: $(url).offset().top - 85,
            },
            1000
          );
        }
        return false;
      });
  }
  perker_anchor();

  /*** Appear ***/

  function perker_appear() {
    var div = jQuery(".perker_appear");

    div.each(function () {
      var element = jQuery(this);

      element.waypoint({
        handler: function () {
          element.addClass("load");
        },
        offset: "60%",
      });
    });
  }
  perker_appear();

  function perker_popup() {
    jQuery(".gallery_zoom").each(function () {
      // the containers for all your galleries
      jQuery(this).magnificPopup({
        delegate: "a.zoom", // the selector for gallery item
        type: "image",
        gallery: {
          enabled: true,
        },
        removalDelay: 300,
        mainClass: "mfp-fade",
      });
    });
  }
  perker_popup();

  /*** Ripple ***/

  function perker_ripple() {
    jQuery("#ripple").ripples({
      resolution: 500,
      dropRadius: 20,
      perturbance: 0.04,
    });
  }
  perker_ripple();

  /*** Video ***/

  $(".youtube-bg").mb_YTPlayer();

  /*** Glitch ***/

  $(".glitch").mgGlitch({
    destroy: false,
    glitch: true,
    scale: true,
    blend: true,
    blendModeType: "hue",
    glitch1TimeMin: 200,
    glitch1TimeMax: 400,
    glitch2TimeMin: 10,
    glitch2TimeMax: 100,
  });

  /*** Hero Effect ***/

  function perker_hero_effect() {
    jQuery(window).on("scroll", function () {
      var currentScroll = window.pageYOffset;
      jQuery(".perker_hero_wrap,.glitch").css({
        transform: "scale(" + (100 - currentScroll / 100) / 99 + ")",
        opacity: 1 - currentScroll / 20 / 15,
      });
    });
  }

  /*** Preloader ***/

  function perker_preloader() {
    var mainPreloader = $(".perker_loader-wrapper .loader");
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    var zero = 0;

    mainPreloader.css({
      top: WinHeight / 2 - 2.5,
      left: WinWidth / 2 - 200,
    });

    do {
      mainPreloader.animate(
        {
          width: zero,
        },
        10
      );
      zero += 3;
    } while (zero <= 400);
    if (zero === 402) {
      mainPreloader.animate({
        left: 0,
        width: "100%",
      });
      mainPreloader.animate({
        top: "0",
        height: "100vh",
      });
    }

    setTimeout(function () {
      $(".perker_loader-wrapper").fadeOut("fast");
      mainPreloader.fadeOut("fast");
    }, 4500);
  }
  jQuery(window).on("scroll", function () {
    perker_hero_effect();
  });

  jQuery(window).on("resize", function () {
    perker_hero_height();
  });

  jQuery(window).load("body", function () {
    setTimeout(function () {
      perker_preloader();
    }, 1000);
    setTimeout(function () {
      jQuery(
        ".perker_hero_wrap .hero_texts,.perker_hero_wrap_video .hero_texts"
      ).addClass("animate");
    }, 6000);
  });
});

// run word
const titles = [
  "Web Developer at PasserellesnumeriquesCambodia",
  "UX/UI Designer at PasserellesnumeriquesCambodia",
  "Back-End Developer at PasserellesnumeriquesCambodia",
  "Fullstack Developer at PasserellesnumeriquesCambodia",
];
let currentIndex = 0;
const subtitleElement = document.querySelector(".hero_texts .subtitle");

function typeWriter(text, i, callback) {
  if (i < text.length) {
    subtitleElement.textContent = text.substring(0, i + 1);
    setTimeout(() => typeWriter(text, i + 1, callback), 100); // Typing speed (ms)
  } else if (typeof callback === "function") {
    setTimeout(callback, 2000); // Pause before next title (ms)
  }
}

function rotateTitle() {
  currentIndex = (currentIndex + 1) % titles.length;
  subtitleElement.textContent = ""; // Clear before typing
  typeWriter(titles[currentIndex], 0, rotateTitle);
}

// Start the animation
rotateTitle();

// Optional: Click to skip to next title
document.querySelector(".hero_texts").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % titles.length;
  subtitleElement.textContent = "";
  typeWriter(titles[currentIndex], 0, rotateTitle);
});

// team member
const members = [
  {
    name: "Lethean Seourn",
    role: "Product Owner",
    skills: ["web-design", "javascript", "vc1", "oop", "algorithm"],
    img: "img/about/lethean.jpg",
  },
  {
    name: "Panha Nhean",
    role: "Back-End Developer",
    skills: ["oop"],
    img: "img/about/panha.jpg",
  },
  {
    name: "Rochom Eub",
    role: "Scrum Master",
    skills: ["vc1"],
    img: "img/about/eubjpg.jpg",
  },
  {
    name: "Yong Sy Din",
    role: "Git Manager",
    skills: ["vc1"],
    img: "img/about/yongsy.jpg",
  },
  {
    name: "Piseth Un",
    role: "Quality Assurance",
    skills: ["web-design", "vc1"],
    img: "img/about/piseth.jpg",
  },
  {
    name: "Solin Neath",
    role: "Quality Code",
    skills: ["algorithm", "vc1"],
    img: "img/about/solin.jpg",
  },
  {
    name: "Mesa Nat",
    role: "Front-End Developer",
    skills: ["algorithm", "oop"],
    img: "img/about/mesa.jpg",
  },
  {
    name: "Lynak Khat",
    role: "Team Leader",
    skills: ["javascript"],
    img: "img/about/lynak.jpg",
  },
  {
    name: "Nil Rothana Tep",
    role: "Front-End Developer",
    skills: ["javascript"],
    img: "img/about/rohtana.jpg",
  },
  {
    name: "Kartrok Thy",
    role: "Quality Code",
    skills: ["web-design"],
    img: "img/about/katrok.jpg",
  },
];

const teamList = document.getElementById("team-list");
const buttons = document.querySelectorAll(".filter-btn");

function renderMembers(skill) {
  teamList.innerHTML = "";

  const filteredMembers =
    skill === "all"
      ? members
      : members.filter((member) => member.skills.includes(skill));

  if (filteredMembers.length === 0) {
    teamList.innerHTML = `
        <li>
          <div class="inner">
            <div class="texts" style="text-align: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ea3509" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h3>No Members Found</h3>
              <span>We couldn't find any team members with the selected skill.</span>
            </div>
          </div>
        </li>
      `;
    return;
  }

  filteredMembers.forEach((member) => {
    let displayRole = member.role;

    // Special roles for Lethean based on skill
    if (member.name === "Lethean Seourn") {
      if (skill === "vc1") {
        displayRole = "Product Owner";
      } else if (skill === "web-design" || skill === "algorithm") {
        displayRole = "Team Leader";
      } else if (skill === "oop" || skill === "javascript") {
        displayRole = "Git Manager";
      } else {
        displayRole = "FullStack Developer";
      }
    }

    const html = `
        <li>
          <div class="inner">
            <div class="image">
              <img src="${member.img}" alt="${member.name}" loading="lazy" />
              <div class="main" style="background-image: url(${member.img});"></div>
            </div>
            <div class="texts">
              <h3>${member.name}</h3>
              <span>${displayRole}</span>
            </div>
          </div>
        </li>
      `;
  teamList.insertAdjacentHTML("beforeend", html);
});
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const skill = button.getAttribute("data-skill");
    renderMembers(skill);
  });
});

// Show all by default
renderMembers("all");

// Add animation on load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    teamList.parentElement.classList.add("load");
  }, 100);
});

// team member end

function perker_anchor() {
  jQuery(".perker_topbar .menu ul li a, .perker_topbar .dropdown .main ul li a")
    .off()
    .on("click", function (e) {
      var element = jQuery(this);
      var url = element.attr("href");

      // Only handle hash links
      if (url && url.charAt(0) === '#') {
        e.preventDefault();
        var target = jQuery(url);
        if (target.length) {
          jQuery('html, body').animate({
            scrollTop: target.offset().top - 85
          }, 1000);
        }
      }
    });
}


// qr payment
  const qrData = {
    "Basic": {
      image: "img/about/qr.jpg",
      title: "Pay for Basic Plan",
      description: "Scan to pay $22/month"
    },
    "Plus": {
      image: "img/qr-plus.png",
      title: "Pay for Plus Plan",
      description: "Scan to pay $33/month"
    },
    "Pro": {
      image: "img/qr-pro.png",
      title: "Pay for Pro Plan",
      description: "Scan to pay $55/month"
    }
  };

  document.querySelectorAll(".select-btn").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const plan = this.closest(".in").querySelector(".title").textContent;
      const modal = document.getElementById("qrModal");
      const qrImage = document.getElementById("qrImage");
      const qrTitle = document.getElementById("qrTitle");
      const qrDesc = document.getElementById("qrDescription");

      if (qrData[plan]) {
        qrImage.src = qrData[plan].image;
        qrTitle.textContent = qrData[plan].title;
        qrDesc.textContent = qrData[plan].description;
        modal.style.display = "block";
      }
    });
  });

  document.querySelector(".qr-close").addEventListener("click", () => {
    document.getElementById("qrModal").style.display = "none";
  });

  window.addEventListener("click", (e) => {
    const modal = document.getElementById("qrModal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  