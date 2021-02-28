import '../App.css';
import { useState, useRef, useCallback } from 'react';
import React from "react";
import Webcam from "react-webcam";

function AddFace() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState([]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 100, height: 70 });
    setImgSrc([...imgSrc, imageSrc]);
  });

  return (
    <div>
      <div className="d-flex justify-content-center top">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-outline-primary" onClick={capture}>Capture photo</button>
      </div>
      <div className="d-flex justify-content-around">
        <div className="d-flex flex-wrap">
          <div className="card">
            <div className="card-body">
            <canvas id="canvas" />
              {/* This is some text within a card body. */}
              {imgSrc && (
                imgSrc.map((data, index) => {
                  return <img key={index} src={data} />
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddFace;