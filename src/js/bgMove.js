let bgMove = () => {
    let velocity = 0.05;
    let testCat = document.querySelector("body");
    let pos = content_wrapper.scrollTop;
    // testCat.style.backgroundPositionY = Math.ceil(-pos) * velocity + 'px';
    testCat.style.backgroundPositionY = -pos * velocity + "px";
  };