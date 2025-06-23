"use client";
import React, { useEffect, useReducer, useState } from "react";
import FileUpload from "../components/FileUpload";
import VideoUploadForm from "../components/FileUpload";

const page = () => {
  const [progress, setProgress] = useState(0);
  const [res, setRes] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    // //   const res = fetch("/videos", {
    // //     method: "POST",
    // //     "Content-Type": "Application/json",
    // //     body: {

    // //     }
    // //   })
    // };
    // fetchData();
    console.log(res);
  }, [res]);

  return (
    <div>
      <div>
        <VideoUploadForm
          onSuccess={(res) => setRes(res)}
          onProgress={(progress) => setProgress(progress)}
        />
        {!!progress && <p>uploading {progress}</p> }
      </div>
    </div>
  );
};

export default page;
