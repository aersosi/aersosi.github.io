const bgMove = () => {
  const velocity = 0.05;
  const testCat = document.querySelector("body");
  const pos = content_wrapper.scrollTop;
    // testCat.style.backgroundPositionY = Math.ceil(-pos) * velocity + 'px';
    testCat.style.backgroundPositionY = -pos * velocity + "px";
  };