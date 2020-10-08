document.addEventListener("DOMContentLoaded", function (event) {
  console.log("await2001");
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

  // async function tryIMG(img_count) {
  //   const flagLINK = `./dist/img/flags/flg_${img_count}.png`
  //   const response = await fetch(flagLINK)
  //   const user = await response.json()

  //   return await Promise.all(user.map(async function(flagLINK) {
  //     const response = await fetch(`./dist/img/flags/${flagLINK}`)
  //     const flagData = await response.json()
  //     console.log(flagData)
  //     return flagData.imageUrl
  //   }))
  // }

  // tryIMG(img_count);

  const loadImgAfter = () => {
    const wrapperVal = Math.round(
      content_wrapper.scrollTop + content_wrapper.offsetHeight
    );
    const contentVal = content.offsetHeight;

    if (wrapperVal + 300 >= contentVal && gateway) {
      // console.log(content_wrapper.scrollTop + content_wrapper.offsetHeight + 300)
      // console.log(content.offsetHeight)

      const tryIMG = async (imgTRY, failIMG) => {
        const response = await fetch(imgTRY);
        const flagData = await response.blob();
        let img_URL = URL.createObjectURL(flagData);

        console.log(flagData);
        let addImg = () => {
          let contElement = document.createElement("div");
          contElement.classList.add("img-cont");

          let imgElement = document.createElement("img");
          imgElement.classList.add("image");
          imgElement.src = img_URL;

          contElement.appendChild(imgElement);
          content.appendChild(contElement);
        };
        addImg();
        addListeners();
        makeImagesVisible();
        img_count++;

        // flagData.then((response) => {
        //   response.blob().then((blob_img) => {

        // if (failCount >= 14) {

        //   gateway = false;
        //   // console.info("Out of Flags");

        // } else if (!response.ok && gateway) {

        //   failCount++;
        //   // console.log(failCount);
        //   throttle(tryIMG(failIMG, imgTRY), 1000)

        // } else if (response.ok && gateway) {

        //   createIMG(blob_img, img_count);

        //   if (createIMG) {
        //     // console.log(img_count)
        //     img_count ++;
        //     // console.log("create image true");
        //     addListeners();
        //     makeImagesVisible();
        //   }
        // }
        // });

        // });
      };

      console.log(img_count);
      let png = `./dist/img/flags/flg_${img_count}.png`;
      let jpg = `./dist/img/flags/flg_${img_count}.jpg`;

      // var i = 0;

      // for (i; i <= 2; i++) {
      throttle(tryIMG(png, jpg), 1000);
      // tryIMG(png, jpg);

      // }
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

  // content_wrapper.addEventListener("scroll", throttle(loadImgAfter, 10), false);
  content_wrapper.addEventListener("scroll", loadImgAfter, false);
  makeImagesVisible();
  addListeners();

  window.addEventListener("resize", clipMarquee);
  marquee();
  clipMarquee();
});
