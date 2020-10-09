// window.requestAnimationFrame = ( () => {
//   return (
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     function (callback) {
//       window.setTimeout(callback, 1000 / 60);
//     }
//   );
// })();

const slideItem = document.querySelectorAll(".slideItem");
const marquee = () => {
  move(slideItem[0]);
};
const marqueeOpacity = () => {
  const marqueeElem = document.querySelector(".marqueeContainer");
  marqueeElem.style.opacity = 1
};

setTimeout( marqueeOpacity , 500)

const move = (elem) => {
  const elemWidth = Math.ceil(elem.clientWidth);

  

  let mLeft = 0;
  const frame = () => {
    mLeft++; // update parameters
    elem.style.marginLeft = -mLeft + "px"; // show frame
    if (mLeft == elemWidth) {
      elem.style.marginLeft = 0 + "px";
      mLeft = 0;
    }
  };
  const id = setInterval(frame, 20); // draw every 10ms
};
