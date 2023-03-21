'use strict';

var plans = [
  { planId: 1, planName: "Package 1", amount: 200 },
  { planId: 2, planName: "Package 2", amount: 400 },
  { planId: 3, planName: "Package 3", amount: 800 },
  { planId: 4, planName: "Package 4", amount: 1600 },
  { planId: 5, planName: "Package 5", amount: 3200 },
  { planId: 6, planName: "Package 6", amount: 6400 },
  { planId: 7, planName: "Package 7", amount: 12800 },
  { planId: 8, planName: "Package 8", amount: 25600 },
  { planId: 9, planName: "Package 9", amount: 51200 },
  { planId: 10, planName: "Package 10", amount: 102400 },
]

// menu options custom affix
var fixed_top = $(".header");
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    fixed_top.addClass("animated fadeInDown menu-fixed");
  }
  else {
    fixed_top.removeClass("animated fadeInDown menu-fixed");
  }
});

// mobile menu js
$(".navbar-collapse>ul>li>a, .navbar-collapse ul.sub-menu>li>a").on("click", function () {
  const element = $(this).parent("li");
  if (element.hasClass("open")) {
    element.removeClass("open");
    element.find("li").removeClass("open");
  }
  else {
    element.addClass("open");
    element.siblings("li").removeClass("open");
    element.siblings("li").find("li").removeClass("open");
  }
});

let img = $('.bg_img');
img.css('background-image', function () {
  let bg = ('url(' + $(this).data('background') + ')');
  return bg;
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#nav-links a');
// Show or hide the sticky footer button
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 200) {
    $(".scroll-to-top").css('display', 'flex');
  } else {
    $(".scroll-to-top").css('display', 'none');
  }

  const currentSection = sections.length - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - 60) - 1;
  navLinks.forEach(link => link.classList.remove('active-link'));


  if (currentSection == 0) $('#home-link').addClass('active-link');
  if (currentSection == 1) $('#about-link').addClass('active-link');
  if (currentSection == 2) $('#plan-link').addClass('active-link');
  if (currentSection == 5) $('#contact-link').addClass('active-link');
});

// Animate the scroll to top
$(".scroll-to-top").on("click", function (event) {
  event.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 300);
});


//preloader js code
$(".preloader").delay(300).animate({
  "opacity": "0"
}, 300, function () {
  $(".preloader").css("display", "none");
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


function insertProductPlans(plans) {
  // Loop through each plan in the array
  for (var i = 0; i < plans.length; i++) {
    // Create a new div element for the product plan
    var plan = plans[i];
    // Add the plan's data to the div element

    var div1 = $("<div></div>").addClass("col-xl-3 col-lg-4 col-md-6 mb-30");
    var div2 = $("<div></div>").addClass("package-card text-center bg_img")
      // .attr("data-background", "assets/images/bg/bg-4.png");
      .css('background-image', function () {
        var bg = ('url(assets/images/bg/bg-4.png)');
        return bg;
      });
    var h4 = $("<h4></h4>").addClass("package-card__title base--color mb-2").text(`${plan.planName}`);
    var ul = $("<ul></ul>").addClass("package-card__features mt-4");
    var li1 = $("<li></li>").text("Return 0.2%");
    var li2 = $("<li></li>").text("Every Day");
    var li3 = $("<li></li>").text("For Lifetime");
    var li4 = $("<li></li>").text("Lifetime Earning");
    var div3 = $("<div></div>").addClass("package-card__range mt-5 base--color").text(`₹ ${plan.amount}`);
    var a = $("<a></a>").addClass("cmn-btn btn-md mt-4").attr("href", `./app/auth/login?planId=${plan.planId}`).text("Invest Now");

    // Append the elements to the DOM
    ul.append(li1, li2, li3, li4);
    div2.append(h4, ul, div3, a);
    div1.append(div2);
    $("#plan-container").append(div1);
  }
}

insertProductPlans(plans);


/* ==============================
          slider area
================================= */

// testimonial slider
$('.testimonial-slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  // autoplay: true,
  prevArrow: '<div class="prev"><i class="las la-angle-left"></i></div>',
  nextArrow: '<div class="next"><i class="las la-angle-right"></i></div>',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});


$('.payment-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  prevArrow: '<div class="prev"><i class="las la-angle-left"></i></div>',
  nextArrow: '<div class="next"><i class="las la-angle-right"></i></div>',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
});
