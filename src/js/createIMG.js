//= include isFileImage.js

const createIMG = (blob) => {
  const xx = isFileImage(blob);
  console.log(blob.type);
  // console.log(blob);

  if (xx) {
    // const img_URL = URL.createObjectURL(blob);
    const img_URL = `./dist/img/flags/flg_${img_count}.png`
    const more_1 = `<div id='${img_URL}' class="img-cont flg_${img_count}">
                  <img class="image" src="${img_URL}" alt="Flag number ${img_count}">
                </div>`;
    content.innerHTML += more_1;
    return true;
  }
  return false;
};
