const spinner = (spinnerDIV) => {
    setTimeout(() => {
      spinnerDIV.style.opacity = 0;
    }, 400);
    setTimeout(() => {
      spinnerDIV.style.display = "none";
    }, 1150);
    return true;
  };