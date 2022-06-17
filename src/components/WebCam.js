import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

// const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 300,
  height: 280,
  facingMode: "user",
};

export const WebcamCapture = () => {
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    console.log(imageSrc);
  };

  return (
    <div className="webcam-container">
      {image === "" ? (
        <Webcam
          audio={false}
          height={280}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          videoConstraints={videoConstraints}
        />
      ) : (
        <img src={image} alt="user" />
      )}
      <div>
        {image !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="btn-cam"
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="btn-cam"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};
