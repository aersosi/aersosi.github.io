  //= include isFileImage.js


let createIMG = (blob, img_count) => {
  isFileImage(blob);
  let img_URL = URL.createObjectURL(blob);

  // console.log(blob.type);
  // console.log(blob);

  if (isFileImage) {
    let more_1 = `<div class="img-cont flg_${img_count}">
                  <img class="image" src="${img_URL}" alt="Flag number ${img_count}">
                </div>`;
    content.innerHTML += more_1;
    return true;
  }
};


