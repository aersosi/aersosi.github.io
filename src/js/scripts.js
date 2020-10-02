document.addEventListener("DOMContentLoaded", function (event) {
  //= include throttle.js
  //= include scrollToTop.js
  //= include makeImagesVisible.js
  //= include marquee.js
  //= include basicLightBox.min.js

  let content_wrapper = document.querySelector("#content_wrapper");
  let content = document.querySelector("#content section");

  let img_count = 13;
  let img_count2 = img_count + 1;
  let img_count3 = img_count + 2;

  ///////////////////// add images on scroll
  // todo: maybe always add 3 images?

  function loadImgAfter() {
    if (
      content_wrapper.scrollTop + content_wrapper.offsetHeight + 200 >
        content.offsetHeight &&
      img_count < 35
    ) {
      let more_3 = `
        <div class="img-cont flg_${img_count}">
          <img class="image" src="./dist/img/flags/flg_${img_count}.jpg" alt="Flag number ${img_count}">
        </div>
        <div class="img-cont flg_${img_count2}">
          <img class="image" src="./dist/img/flags/flg_${img_count2}.jpg" alt="Flag number ${img_count2}">
        </div>
        <div class="img-cont flg_${img_count3}">
          <img class="image" src="./dist/img/flags/flg_${img_count3}.jpg" alt="Flag number ${img_count3}">
        </div>`;
      content.innerHTML += more_3;

      makeImagesVisible();
      addListeners();

      img_count += 3;
      img_count2 += 3;
      img_count3 += 3;
    }
  }

  ///////////////////// eventlisteners for imagelightbox
  // todo: eventlisteners are added multiple times on scroll --> prevent double listeners

  function addListeners() {
    document.querySelectorAll(".img-cont img").forEach((item) => {
      item.addEventListener("click", (event) => {
        let target_link = event.target.src;
        Lightbox.create(`<img src="${target_link}">`).show();
      });
    });
  }
  addListeners();


  

  ///////////////////// test for image 404
  //   function testImage(URL) {
  //     var tester=new Image();
  //     tester.onload=imageFound;
  //     tester.onerror=imageNotFound;
  //     tester.src=URL;
  // }

  // function imageFound() {
  //     alert('That image is found and loaded');
  // }

  // function imageNotFound() {
  //     alert('That image was not found.');
  // }

  // testImage("http://foo.com/bar.jpg");



  ///////////////////// events

  marquee();
  makeImagesVisible();

  let toTopButton = document.querySelector(".toTopButton");
  toTopButton.addEventListener("click", toTop, false);

  content_wrapper.addEventListener("scroll", throttle(loadImgAfter, 30), false);
  
});
