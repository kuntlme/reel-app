"use client";
import React, { useEffect, useState } from "react";
import { Video } from "@imagekit/next";
import { IVideo } from "@/models/Video";

const page = () => {
  const [videos, setVideos] = useState<IVideo[] | null>(null);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/videos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        setVideos(data);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div>
      <h2>Videos</h2>
      <div>
        {Array.isArray(videos) &&
          videos?.length > 0 &&
          videos?.map((video) => (
            <Video
              key={video._id?.toString()}
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
              src={video.videoUrl}
              controls={true}
            />
          ))}
      </div>
    </div>
  );
};

export default page;
