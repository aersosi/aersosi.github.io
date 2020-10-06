document.addEventListener("DOMContentLoaded", function (event) {
  //= include throttle.js
  //= include putTel.js
  //= include marquee.js
  //= include clipMarquee.js
  //= include modal.js
  //= include bgMove.js
  //= include createIMG.js
  //= include addListeners.js
  //= include makeImagesVisible.js
  //= include scrollToTop.js
  //= include lightBox.min.js

  let content_wrapper = document.querySelector("#content_wrapper");
  let content = document.querySelector("#content main");

  ///////////////////// add images on scroll
  // todo: maybe always add 3 images?
  let img_count = 13;
  let gateway = true;
  let failCount = 0;

  const loadImgAfter = () => {
    if (
      content_wrapper.scrollTop + content_wrapper.offsetHeight + 300 >
        content.offsetHeight && gateway
    ) {

      
      const tryIMG = (imgTRY, failIMG) => {
        const request_img = new Request(imgTRY);
        fetch(request_img).then((response) => {
          response.blob().then((blob_img) => {
            if (failCount >= 14) {
              gateway = false;
              // console.info("Out of Flags");
            } else if (!response.ok && gateway) {
              failCount++;
              // console.log(failCount);
              tryIMG(failIMG, imgTRY);
            } else if (response.ok && gateway) {
              createIMG(blob_img, img_count);
              if (createIMG) {
                // console.log(img_count)
                img_count += 1;
                console.log("create image true");
                addListeners();
                makeImagesVisible();
              }
            }
          });
        });
      };


      console.log(img_count);
      let png = `./dist/img/flags/flg_${img_count}.png`;
      let jpg = `./dist/img/flags/flg_${img_count}.jpg`;
      tryIMG(png, jpg);
    }
  };

  // function getScrollbarWidth() {
  //   // Creating invisible container
  //   const outer = document.createElement("div");
  //   outer.style.visibility = "hidden";
  //   outer.style.overflow = "scroll"; // forcing scrollbar to appear
  //   outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  //   document.body.appendChild(outer);

  //   // Creating inner element and placing it in the container
  //   const inner = document.createElement("div");
  //   outer.appendChild(inner);

  //   // Calculating difference between container's full width and the child width
  //   const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  //   // Removing temporary elements from the DOM
  //   outer.parentNode.removeChild(outer);
  //   // console.log(scrollbarWidth)
  //   return scrollbarWidth;
  // }

  content_wrapper.addEventListener("scroll", bgMove);
  ///////////////////// events

  let toTopButton = document.querySelector(".toTopButton");
  toTopButton.addEventListener("click", toTop, false);

  let aboutImprint = document.querySelector(".aboutImprint");
  aboutImprint.addEventListener("click", addModal);

  let aboutImprintClose = document.querySelector(".close");
  aboutImprintClose.addEventListener("click", removeModal);

  content_wrapper.addEventListener("scroll", throttle(loadImgAfter, 10), false);
  // content_wrapper.addEventListener("scroll", loadImgAfter, false);
  makeImagesVisible();
  addListeners();

  window.addEventListener("resize", clipMarquee);
  marquee();
  clipMarquee();
});
