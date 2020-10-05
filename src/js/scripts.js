document.addEventListener("DOMContentLoaded", function (event) {
  //= include throttle.js
  //= include scrollToTop.js
  //= include createIMG.js
  //= include addListeners.js
  //= include makeImagesVisible.js
  //= include marquee.js
  //= include lightBox.min.js

  let content_wrapper = document.querySelector("#content_wrapper");
  let content = document.querySelector("#content section");

  ///////////////////// add images on scroll
  // todo: maybe always add 3 images?

  let img_count = 13;
  let gateway = true;

  let isFileImage = (blob) => {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

    console.log(blob.type);
    // return blob && acceptedImageTypes.includes(blob.type);
    return blob.type
  };



  let loadImgAfter = () => {
    if (
      content_wrapper.scrollTop + content_wrapper.offsetHeight + 300 >
        content.offsetHeight &&
      gateway
    ) {
      void (async () => {
        let response_jpg = await fetch(`./dist/img/flags/flg_${img_count}.jpg`);
        let blob_jpg = await response_jpg.blob();
        // let fileType_jpg = blob_jpg.type;
        // console.log(fileType);

          let response_png = await fetch(`./dist/img/flags/flg_${img_count}.png`);
          let blob_png = await response_png.blob();

        // let fileType_png = blob.type;

        // if (response.ok && fileType === 'image/jpeg') {
        if (response_jpg.ok) {
          createIMG(blob_jpg, img_count);
          img_count += 1;
          addListeners();
          makeImagesVisible();
        } else if (response_png.ok){
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

  ///////////////////// eventlisteners for imagelightbox
  // todo: eventlisteners are added multiple times on scroll --> prevent double listeners



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

  function clipSlider() {
    let slider = document.querySelector(".slider");
    let sectionWidth = document.querySelector("section").scrollWidth;
    slider.style.clip = "rect(0px," + sectionWidth + "px,200px,0px)";
  }
  clipSlider();

  ///////////////////// events

  marquee();
  makeImagesVisible();
  addListeners();

  let toTopButton = document.querySelector(".toTopButton");
  toTopButton.addEventListener("click", toTop, false);

  content_wrapper.addEventListener("scroll", throttle(loadImgAfter, 30), false);
  window.addEventListener("resize", clipSlider);
});
