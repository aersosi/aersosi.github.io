const add_listeners = (thisIMG) => {
  thisIMG.addEventListener("click", (e) => {
    const target_link = e.target.getAttribute('data-url');
    Lightbox.create(`<img src="${target_link}">`).show();
    // let winHeig = window.innerHeight;
    // let thisIMG = document.querySelector(`img[src="${target_link}"]`);
    // let imgHeight = thisIMG.clientHeight;
    // let marginTop = (winHeig - imgHeight) / 2
    // thisIMG.style.marginTop = marginTop
    // console.log(winHeig, imgHeight)

  });
  }
