let addModal = () => {
    let modal_Wrapper = document.querySelector(".modalWrapper");

  modal_Wrapper.style.position = "fixed";
  modal_Wrapper.style.display = "flex";
  setTimeout(() => {
    modal_Wrapper.classList.add("show");
  }, 250);
};

let removeModal = () => {
    let modal_Wrapper = document.querySelector(".modalWrapper");

  modal_Wrapper.classList.remove("show");
  setTimeout(() => {
    modal_Wrapper.style.position = "";
    modal_Wrapper.style.display = "none";
  }, 250);
};