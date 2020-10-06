  window.requestAnimationFrame = ( () => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  const marquee = () => {
    const slideItem = document.querySelectorAll(".slideItem");
    move(slideItem[0]);
  }

  const move = (elem) => {
    let mLeft = 0;
    const frame = () => {
      mLeft++; // update parameters
      elem.style.marginLeft = -mLeft + "px"; // show frame
      if (mLeft == 543) {
        elem.style.marginLeft = 0 + "px";
        mLeft = 0;
      }
    }
    const id = setInterval(frame, 10); // draw every 10ms
  }
  
