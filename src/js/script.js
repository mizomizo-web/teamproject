jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // スクロールバーを除いた幅を取得
  let vw = document.body.clientWidth;
  document.documentElement.style.setProperty('--vw', vw + 'px');

  var topBtn = $(".c-pagetop");
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 770) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
    return false;
  });

  // ヘッダー
  $(window).on("scroll", function () {
    if (
      ($(".slider1").height() || $(".p-sub-fv").height()) < $(this).scrollTop()
    ) {
      $(".p-header").css("background", "rgba(17,17,17,1)");
    } else {
      $(".p-header").css("background", "rgba(17,17,17,0.5)");
    }
  });

  //ドロワーメニュー
  $(".navbar_toggle").on("click", function () {
    $(this).toggleClass("open");
    $(".menu").toggleClass("open");
  });

  // ハンバーガーメニュー
  $(".js-hamburger").on("click", function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      $(".js-nav-menu").fadeOut();
      $(".js-hamburger").removeClass("is-active");
    } else {
      $(".js-nav-menu").fadeIn();
      $(".js-hamburger").addClass("is-active");
    }
    // $('body').css('overflow-y', 'hidden');  // 本文の縦スクロールを無効
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)
  $(document).on("click", 'a[href*="#"]', function () {
    let time = 400;
    let header = $("header").innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $("html,body").animate({ scrollTop: targetY }, time, "swing");
    return false;
  });

  $(".js-category-item__link").on("click", function () {
    $(".c-category-item__link").removeClass("is-active");
    $(this).addClass("is-active");
  });

  // ページ遷移時のヘッダー高さマイナス
  $(window).on("load", function () {
    let headerHeight = $(".p-header").outerHeight();
    let urlHash = location.hash;
    if (urlHash) {
      let position = $(urlHash).offset().top - headerHeight;
      $("html, body").animate({ scrollTop: position }, 0);
    }
  });

  // swiper mv
  // swiper1
  var slider1 = new Swiper(".slider1", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
  });

  // swiper2
  var slider2 = new Swiper(".slider2", {
    loop: true,
    effect: "slide",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
  });

  // single-swiper
  //メイン
  var slider = new Swiper ('.gallery-slider', {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    loopedSlides: 8, //スライドの枚数と同じ値を指定
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
  });

  //サムネイル
  var thumbs = new Swiper ('.gallery-thumbs', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    centeredSlides : true,
    autoplay: true,
    speed: 1000,
    loop: true,
    slideToClickedSlide: true,
    breakpoints: {
      // 768px以上の場合
      768: {
        spaceBetween: 8,
        centeredSlides : false,
      }
    }
  });

  //4系～
  //メインとサムネイルを紐づける
  slider.controller.control = thumbs;
  thumbs.controller.control = slider;

  // リサイズイベント
  $(window).resize(function(){ 
    var $window = $(this).width();
    var bp = 767;
    if($window > bp){
    $(".js-hamburger").removeClass("is-active");
    $(".js-nav-menu").fadeOut();
    }else{
    $(".p-sp-nav").hide();
    $(".js-hamburger").removeClass("is-active");
    }
  });
});
