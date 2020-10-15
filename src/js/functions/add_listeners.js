const add_listeners = (thisIMG) => {
  thisIMG.addEventListener("click", (event) => {
    const target_link = event.target.src;
    Lightbox.create(`<img src="${target_link}">`).show();
  });
  }
