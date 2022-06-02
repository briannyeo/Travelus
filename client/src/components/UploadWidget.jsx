import React from "react";
const UploadWidget = ({ addImagesURL }) => {
  const srcArr = [];
  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `duudexfbu`,
        uploadPreset: `oocipezd`,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info.url);
          srcArr.push(result.info.url);
          console.log("srcArr", srcArr);
          await addImagesURL(srcArr);
        }
      }
    );
    widget.open();
  };

  return <span onClick={showWidget}> Upload Image </span>;
};

export default UploadWidget;
