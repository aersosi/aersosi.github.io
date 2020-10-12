const okScroll = (elm) => {
  const element = document.querySelectorAll(elm);
  element.style.overflow = "auto";
};

const noScroll = (elm) => {
  const element = document.querySelector(elm);
  element.style.overflow = "hidden";
};
