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
        breakpoint: 790,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // Modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn();
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut();
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn();
    });
  });

  // Validator

  function validation(item) {
    $(item).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста, введи свое имя.",
        phone: "Пожалуйста, введите свой номер телефон.",
        email: {
          required: "Пожалуйста, введите свою почту.",
          email: "Неправильно введен адрес почты.",
        },
      },
    });
  }

  validation("#consultation form");
  validation("#order form");
  validation("#consultation-form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  // sending letters to mail

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "./mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn();

      $("form").trigger("reset");
    });
    return false;
  });

  // Scroll UP

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  // SlowScrolling

  function slowScrolling(item) {
    $(`a[href=${item}]`).click(function () {
      const _href = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
      return false;
    });
  }

  slowScrolling("#up");
  slowScrolling("#down");

  // wow.js

  new WOW().init();
});
