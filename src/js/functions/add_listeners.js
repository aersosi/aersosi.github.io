const add_listeners = (thisIMG) => {
  thisIMG.addEventListener("click", (e) => {
    const target_link = e.target.src;
    Lightbox.create(`<img src="${target_link}">`).show();
  });
  }
