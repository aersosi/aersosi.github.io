
  const clipMarquee = () => {
    setTimeout(() => { 
      const slider = document.querySelector(".slider");
      const mainWidth = document.querySelector("main").scrollWidth;
      slider.style.clip = "rect(0px," + mainWidth + "px,200px,0px)";
      slider.style.opacity = 1;
    }, 400);

  }