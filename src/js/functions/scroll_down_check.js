const scroll_down_check = (e) => {
    if (e.deltaY > 0) {
      scrollDown = true;
    } else {
      scrollDown = false;
    }
  };