function isFileImage(blob) {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (acceptedImageTypes.includes(blob["type"])) {
        // console.log(file)
      return true;
    }
  }