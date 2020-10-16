var scrollPos = 0;
window.addEventListener('scroll', function(){
  if ((document.body.getBoundingClientRect()).top > scrollPos) {
    scrollDown = false;
  }  else {
    scrollDown = true;
  }
  scrollPos = (document.body.getBoundingClientRect()).top;
  // console.log(scrollPos)
});