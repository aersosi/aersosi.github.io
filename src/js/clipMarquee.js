
  function clipMarquee() {

    setTimeout(() => { 
      let slider = document.querySelector(".slider");
      let mainWidth = document.querySelector("main").scrollWidth;
      slider.style.clip = "rect(0px," + mainWidth + "px,200px,0px)";
      slider.style.opacity = 1;
    }, 400);

  }