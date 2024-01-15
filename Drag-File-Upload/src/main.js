document.querySelectorAll(".drop-zone__input").forEach((inpElement) => {
  const dropZoneElement = inpElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inpElement.click();
  });

  inpElement.addEventListener("change", (e) => {
    if (inpElement.files.length) {
      updateThumbnail(dropZoneElement, inpElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      inpElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 *
 * @param {HTMLElement} dropZoneElement
 * @param {Object} file
 */
const updateThumbnail = (dropZoneElement, file) => {
  let thumbnailEleement = dropZoneElement.querySelector(".drop-zone__thumb");
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }
  //First time there is no thumbnail element
  if (!thumbnailEleement) {
    thumbnailEleement = document.createElement("div");
    thumbnailEleement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailEleement);
  }

  thumbnailEleement.dataset.label = file.name;

  //show thumbnail for img file
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailEleement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailEleement.style.backgroundImage = null;
  }
};
