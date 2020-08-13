$(document).ready(function () {
  $(".carusel__inner").slick({
    speed: 1200,
    adaptiveHeight: false,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="./icons/arrow_left.png" ></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="./icons/arrow_right.png" ></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          dots: true,
        },
      }
    ]
  });
});
