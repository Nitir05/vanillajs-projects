//For Internet Explorer
Array.prototype.forEach.call(document.querySelectorAll(".file-upload__button"), (button) => {
  const hiddenInput = button.parentElement.querySelector(".file-upload__input");
  const label = button.parentElement.querySelector(".file-upload__label");
  const defaultLabelText = "No file(s) selected";

  //Set default text for label
  label.textContent = defaultLabelText;
  label.title = defaultLabelText;

  button.addEventListener("click", () => {
    hiddenInput.click();
  });

  hiddenInput.addEventListener("change", () => {
    const fileList = Array.prototype.map.call(hiddenInput.files, (file) => {
      return file.name;
    });
    label.textContent = fileList.join(", ") || defaultLabelText;
    label.title = label.textContent;
  });
});
