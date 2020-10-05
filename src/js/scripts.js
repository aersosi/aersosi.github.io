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

  // let isFileImage = (blob) => {
  //   const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

  //   console.log(blob.type);
  //   // return blob && acceptedImageTypes.includes(blob.type);
  //   return blob.type
  // };

  let img_count = 13;
  let gateway = true;

  let loadImgAfter = () => {
    if (
      content_wrapper.scrollTop + content_wrapper.offsetHeight + 300 >
        content.offsetHeight &&
      gateway
    ) {
      void (async () => {
        let response_jpg = await fetch(`./dist/img/flags/flg_${img_count}.jpg`);
        let response_png = await fetch(`./dist/img/flags/flg_${img_count}.png`);

        if (response_jpg.ok) {
          let blob_jpg = await response_jpg.blob();
          // let fileType_jpg = blob_jpg.type;
          createIMG(blob_jpg, img_count);
          img_count += 1;
          addListeners();
          makeImagesVisible();
        } else if (response_png.ok) {
          let blob_png = await response_png.blob();
          // let fileType_png = blob.type;
          createIMG(blob_png, img_count);
          img_count += 1;
          addListeners();
          makeImagesVisible();
        } else {
          gateway = false;
          console.info("Out of Flags");
        }
      })();
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




  // content_wrapper.addEventListener("scroll", throttle(loadImgAfter, 20), false);
  content_wrapper.addEventListener("scroll", loadImgAfter, false);
  makeImagesVisible();
  addListeners();

  window.addEventListener("resize", clipMarquee);
  marquee();
  clipMarquee();
});
