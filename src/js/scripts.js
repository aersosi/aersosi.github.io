document.addEventListener("DOMContentLoaded", function (event) {
  console.log("await2003");
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

  ///////////////////// add images on scroll
  // const tryIMG = (arr) => {
  //   console.log(arr);

  // }


  let content_wrapper = document.querySelector("#content_wrapper");
  let content = document.querySelector("#content main");

  let failCount = 0;
  let imgArray = [];
  let cleanArr = [];
  let gateWay = true;

 const createURLs = (tryIMG) => {
    for (let i = 1; i < 40; i++) {
      const png = `./dist/img/flags/flg_${i}.png`;
      const jpg = `./dist/img/flags/flg_${i}.jpg`;
      imgArray.push(png);
      imgArray.push(jpg);
    }
    console.log('step1: createURLs')
    tryIMG(imgArray, appendIMG)
  };

  const tryIMG = (arr, appendIMG) => {
    let itemsProcessed = 0;
    arr.forEach((element) =>
      fetch(element).then((response) => {
        itemsProcessed++;
        if (failCount >= 200) {
          gateWay = false;
        } else if (!response.ok && gateWay) {
          failCount++;
        } else if (response.ok && gateWay) {
          cleanArr.push(element);
        }
        if (itemsProcessed === arr.length) {
          appendIMG(cleanArr.sort())
        }
      })
    );
    console.log('step2: tryIMG')
  };


  let appendIMG = (arr) => {
    arr.forEach((url) => {
      let containerElm = document.createElement("div");
      containerElm.classList.add("img-cont");
      let imgElm = document.createElement("img");
      imgElm.classList.add("image");
      imgElm.src = url;
      containerElm.appendChild(imgElm);

      content.appendChild(containerElm);
    });
    console.log(arr)
    console.log('step3: appendIMG')
    makeImagesVisible();
    addListeners();
  };

  createURLs(tryIMG)

  // const makeBurger = (createURLs, tryIMG, appendIMG) => {
  //   createURLs()
  //   // tryIMG(createURLs)
  //   // appendIMG(tryIMG)
  //   // makeImagesVisible();
  //   // addListeners();
  // }
  // makeBurger()


  // const getSignal = () => {
  //   const wrapperVal = Math.round(
  //     content_wrapper.scrollTop + content_wrapper.offsetHeight
  //   );
  //   const contentVal = content.offsetHeight;
  //   if (wrapperVal + 300 >= contentVal && gateway) {
  //     console.log(wrapperVal + 300);
  //     console.log(contentVal);
  //     return true;
  //   }
  // };

  // ///////////////////// events
  content_wrapper.addEventListener("scroll", bgMove);

  let toTopButton = document.querySelector(".toTopButton");
  toTopButton.addEventListener("click", toTop, false);

  let aboutImprint = document.querySelector(".aboutImprint");
  aboutImprint.addEventListener("click", addModal);

  let aboutImprintClose = document.querySelector(".close");
  aboutImprintClose.addEventListener("click", removeModal);

  // content_wrapper.addEventListener("scroll", throttle(loadImgAfter, 10), false);
  // content_wrapper.addEventListener("scroll", loadImgAfter, false);
  

  window.addEventListener("resize", clipMarquee);
  marquee();
  clipMarquee();
});
