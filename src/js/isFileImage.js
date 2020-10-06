function isFileImage(file) {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (acceptedImageTypes.includes(file["type"])) {
        console.log(file)
      return true;
    }
  }