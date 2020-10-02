document.addEventListener("DOMContentLoaded", function (event) {
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  //   const speed = 5000;
  //   function currencySlide(){
  //         const currencyPairWidth = $('.slideItem:first-child').outerWidth();
  //       $(".slideContainer").animate({marginLeft:-currencyPairWidth},speed, 'linear', function(){
  //                   $(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
  //           });
  //           requestAnimationFrame(currencySlide);
  //   }

  //   currencySlide();

  function marquee() {
    let slideItem = document.querySelectorAll(".slideItem");
    move(slideItem[0]);
  }

  function move(elem) {
    var mLeft = 0;
    function frame() {
      mLeft++; // update parameters
      elem.style.marginLeft = -mLeft + "px"; // show frame
      if (mLeft == 530) {
        elem.style.marginLeft = 0 + "px";
        mLeft = 0;
      }
    }
    var id = setInterval(frame, 15); // draw every 10ms
  }
  marquee();
});
