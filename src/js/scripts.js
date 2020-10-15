document.addEventListener("DOMContentLoaded", function (event) {
  // console.log("await2003");
  //= include ./functions/throttle.js
  //= include ./functions/spinner.js
  //= include ./functions/scrollNoScroll.js
  //= include ./functions/scroll_down_check.js
  //= include ./functions/putTel.js
  //= include ./functions/marquee.js
  //= include ./functions/modal.js
  //= include ./functions/bgMove.js
  //= include ./functions/add_listeners.js
  //= include ./functions/make_IMGs_visible.js
  //= include ./functions/scrollToTop.js
  //= include ./functions/lightBox.min.js



  const content_wrapper = document.querySelector("#content_wrapper");
  const content = document.querySelector("#content main");
  const spinnerDIV = document.getElementById("spinner");

  let failCount = 0;
  let imgArray = [];
  let cleanArr = [];
  let cleanChunks = [];
  let threeChunk = [];
  let gateWay = true;
  let scrollDown = false;


  ///////////////////// add images on scroll

  const trycreate_URLs = (try_IMG) => {
    let i;
    for (i = 1; i < 40; i++) {
      const png = `./dist/img/flags/flg_${i}.png`;
      const jpg = `./dist/img/flags/flg_${i}.jpg`;
      imgArray.push(png);
      imgArray.push(jpg);
    }
    try_IMG(imgArray, append_IMGs);
  };

  const try_IMG = (arr, append_IMGs) => {
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
          // cut in chunks of 3
          let i,
            j = cleanArr.length,
            chunk = 3,
            firstTwelveArr = [];

          for (i = 0; i < j; i += chunk) {
            threeChunk[i / 3] = cleanArr.slice(i, i + chunk);
            cleanChunks.push(threeChunk[i / 3]);
          }
          firstTwelveArr = cleanChunks.slice(0, 4).flat();
          spinner(spinnerDIV);
          append_IMGs(firstTwelveArr);
        }
      })
    );
  };

  let append_IMGs = (arr) => {
    let allDone = 0;
    arr.forEach((url) => {
      let containerElm = document.createElement("div");
      containerElm.classList.add("img-cont");
      let imgElm = document.createElement("img");
      imgElm.classList.add("image");
      imgElm.src = url;
      containerElm.appendChild(imgElm);
      content.appendChild(containerElm);

      make_IMGs_visible()
      const thisIMG = document.querySelector(`img[src='${url}']`)
      add_listeners(thisIMG);
      allDone++;
    });
    if (allDone == arr.length) {
      return true;
    }
  };

  // const makeBurger = (trycreate_URLs, try_IMG, append_IMGs) => {
  //   trycreate_URLs()
  //   try_IMG(trycreate_URLs)
  //   append_IMGs(try_IMG)
  //   add_listeners();
  // }
  // makeBurger()

let chunkCounter = 4;

  const addThree = () => {
    let ChunkCounterMax = cleanChunks.length;
    if (addThree && chunkCounter < ChunkCounterMax) {

      // let firstThree = document.querySelectorAll(".img-cont:nth-child(-n+3)");
      // firstThree.forEach((e) => e.remove());
      
      let nextThree = cleanChunks[chunkCounter].flat();
      chunkCounter++;
      append_IMGs(nextThree);

      // delete_IMGs(firstThree);
      if (append_IMGs) {
        return true;
      }
    }
  };

  const getSignal = () => {
    const wrapperVal = Math.round(
      document.body.scrollTop + document.body.offsetHeight
    );
    const contentVal = content.offsetHeight;

    // if (wrapperVal + 200 >= contentVal && scrollDown) {
    if (wrapperVal + 0 >= contentVal) {
      addThree();
    } else if (!scrollDown) {
      console.log("scroll UP");
    }
  };



  /////////////////////// events ///////////////////////
  // content_wrapper.addEventListener("scroll", bgMove);

  let toTopButton = document.querySelector(".toTopButton");
  toTopButton.addEventListener("click", toTop, false);

  let aboutImprint = document.querySelector(".aboutImprint");
  aboutImprint.addEventListener("click", addModal);

  let aboutImprintClose = document.querySelector(".close");
  aboutImprintClose.addEventListener("click", removeModal);

  // window.addEventListener("wheel", scroll_down_check, false);
  window.addEventListener("scroll", getSignal, false);

  setTimeout(marquee, 200);
  trycreate_URLs(try_IMG);
});
