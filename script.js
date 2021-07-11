const finalCropWidth = 750;
const finalCropHeight = 500;
const finalAspectRatio = finalCropWidth / finalCropHeight;

let cropper;
let cropperBig;

const loadFile = (event) => {
  const image = document.getElementById("output");
  const imageBig = document.getElementById("outputBig");
  image.src = URL.createObjectURL(event.target.files[0]);
  cropper = new Cropper(image, {
    dragMode: "move",
    autoCropArea: finalAspectRatio,
    restore: false,
    guides: true,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
  });

  imageBig.src = URL.createObjectURL(event.target.files[0]);
  cropperBig = new Cropper(imageBig, {
    dragMode: "move",
    autoCropArea: 1,
    restore: false,
    guides: true,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
    minCropBoxWidth: 1000,
    minCropBoxHeight: 1000,
  });
};

document.querySelector("#btnExport").addEventListener("click", function (e) {
  e.preventDefault();
  var croppedImageDataURL = cropper.getCroppedCanvas({
    width: 750,
    height: 500,
  });
  var croppedImageDataURLBig = cropperBig.getCroppedCanvas({
    width: 1000,
    height: 1000,
  });
  document
    .querySelector("#output-crop")
    .setAttribute("src", croppedImageDataURL.toDataURL("image/png"));

  croppedImageDataURL.toBlob((blob) => {
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "750x500.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  document
    .querySelector("#output-crop-big")
    .setAttribute("src", croppedImageDataURLBig.toDataURL("image/png"));

  croppedImageDataURLBig.toBlob((blob) => {
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "1000x1000.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

document.querySelector("#file").addEventListener("change", loadFile);