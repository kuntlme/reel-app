"use client";
import React, { useEffect, useReducer, useState } from "react";
import FileUpload from "../components/FileUpload";
import VideoUploadForm from "../components/FileUpload";
import { useSession } from "next-auth/react";
type UploadResponse = {
  name: string;
  url: string;
  // add other properties if needed
};

const page = () => {
  const [progress, setProgress] = useState(0);
  const session = useSession();

  const [response, setResponse] = useState<UploadResponse | null>(null);

  useEffect(() => {
    if (!!response) {
      try {
        const fetchData = async () => {
          console.log(response);
          const res = await fetch("/api/videos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              title: response.name,
              description: "sample description",
              videoUrl: response.url,
              thumbnailUrl:
                "https://ik.imagekit.io/srz0flizn/default-image.jpg?updatedAt=1739787013941",
              controls: true,
            }),
          });
          console.log(res);
        };
        fetchData();
      } catch (error) {
        throw new Error("video data save error");
      }
    }
    console.log(response);
  }, [response]);

  return (
    <div>
      <div>
        <VideoUploadForm
          onSuccess={(res) => setResponse(res)}
          onProgress={(progress) => setProgress(progress)}
        />
        {!!response ? (
          <p>uploaded</p>
        ) : (
          !!progress && <p>uploading {progress}</p>
        )}
      </div>
    </div>
  );
};

export default page;
