document.addEventListener("DOMContentLoaded", () => {
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

  const content_wrapper = document.querySelector("#content_wrapper");
  const content = document.querySelector("#content main");

  ///////////////////// add images on scroll
  // todo: maybe always add 3 images?
  let img_count = 13;
  let gateWay = true;
  let failCount = 0;

  const loadImgAfter = () => {
    const buffer = 300;
    const wrapperVal = Math.round(
      content_wrapper.scrollTop + content_wrapper.offsetHeight
    );
    const contentVal = content.offsetHeight;

    if (wrapperVal + buffer >= contentVal && gateWay) {
      // console.log(wrapperVal)
      // console.log(contentVal)

      const tryIMG = (tryFirst, tryAfter) => {
        
        fetch(new Request(tryFirst)).then((response) => {
          
          if (failCount >= 14) {
            gateWay = false;
            // console.info("Out of Flags");
          } else if (!response.ok && gateWay) {
            failCount++;
            tryIMG(tryAfter, tryFirst);
            // console.log(failCount);
            // throttle(tryIMG(failIMG, imgTRY), 2000)
          } else if (response.ok && gateWay) {
            
            response.blob().then((blob_img) => {
              const created = createIMG(blob_img);
              
              if (created) {
                // console.log(img_count)
                img_count += 1;
                console.log("create image true");
                addListeners();
                makeImagesVisible();
              }
            });

            }



        });
      };
      
      console.log(img_count);
      const png = `./dist/img/flags/flg_${img_count}.png`;
      const jpg = `./dist/img/flags/flg_${img_count}.jpg`;
      tryIMG(png, jpg);
      
      // for (var i = 0; i <= 2; i++) {
        // throttle(tryIMG(png, jpg), 2000)
        // }
      }
  };






  content_wrapper.addEventListener("scroll", bgMove);
  ///////////////////// events

  const toTopButton = document.querySelector(".toTopButton");
  toTopButton.addEventListener("click", toTop, false);

  const aboutImprint = document.querySelector(".aboutImprint");
  aboutImprint.addEventListener("click", addModal);

  const aboutImprintClose = document.querySelector(".close");
  aboutImprintClose.addEventListener("click", removeModal);

  // content_wrapper.addEventListener("scroll", throttle(loadImgAfter, 200), false);
  content_wrapper.addEventListener("scroll", loadImgAfter, false);
  makeImagesVisible();
  addListeners();

  window.addEventListener("resize", clipMarquee);
  marquee();
  clipMarquee();
});
