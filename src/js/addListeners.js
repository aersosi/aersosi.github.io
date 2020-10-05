let addListeners = () => {
    document.querySelectorAll(".img-cont img").forEach((item) => {
      item.addEventListener("click", (event) => {
        let target_link = event.target.src;
        Lightbox.create(`<img src="${target_link}">`).show();
      });
    });
  }
