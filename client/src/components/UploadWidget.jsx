import { useState } from "react";
import React from "react";
const UploadWidget = ({ addImagesURL }) => {
  //const [srcArr, setSrcArr] = useState([]);
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
          //setSrcArr();
          console.log("srcArr", srcArr);
          addImagesURL([...srcArr]);
        }
      }
    );
    widget.open();
  };

  return (
    <span
      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={showWidget}
    >
      {" "}
      Upload Image{" "}
    </span>
  );
};

export default UploadWidget;
