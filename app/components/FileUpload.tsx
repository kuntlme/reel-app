// "use client";
// import React, { useRef, useState } from "react";
// import { IKUpload } from "imagekitio-next";
// import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

// interface FileUploadProps {
//     onSuccess: (res: IKUploadResponse) => void,
//     onProgress: (res: number) => void,
//     fileType?: "image" | "video"
// }

// export default function FileUpload({
//     onSuccess,
//     onProgress,
//     fileType = "image"
// }: FileUploadProps) {

//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const ikUploadRefTest = useRef(null);

//     const onError = (err: {message: string}) => {
//         console.log("Error", err);
//         setError(err.message);
//         setUploading(false);
//     };

//     const handleSuccess = (response: IKUploadResponse) => {
//         console.log("Success", response);
//         setUploading(false);
//         setError(null);
//         onSuccess(response);

//     };

//     const handleProgess = (evt: ProgressEvent) => {
//         if(evt.lengthComputable && onProgress){
//             const persentComplete = (evt.loaded / evt.total) * 100;
//             onProgress(Math.round(persentComplete))
//         }
//     };

//     const handleStartUpload = () => {
//         setUploading(true);
//         setError(null)
//     };

//     const validateFile = (file: File) => {
//         if(fileType === "video"){
//             if(!file.type.startsWith("video/")){
//                 setError("Please upload a video file");
//                 return false;
//             }

//             if(file.size > 100 * 1024 * 1024){
//                 setError("video must be less than 100 MB");
//                 return false;
//             }
//         }
//         else{
//             const validtypes = ["image/jpeg", "image/png", "image/webp"];
//             if(!validtypes.includes(file.type)){
//                 setError("Please upload a vaild file");
//                 return false;
//             }

//             if(file.size > 5 * 1024 * 1024){
//                 setError("video must be less than 100 MB");
//                 return false;
//             }
//         }
//         return false;
//     }

//     return (
//         <div className="App">
//             <IKUpload
//                 fileName="test-upload.jpg"
//                 validateFile={validateFile}

//                 onError={onError}
//                 onSuccess={handleSuccess}
//                 onUploadProgress={handleProgess}
//                 onUploadStart={handleStartUpload}
//                 folder={fileType === "video" ? "/videos": "/images"}
//                 transformation={{
//                     pre: "l-text,i-Imagekit,fs-50,l-end",
//                     post: [
//                         {
//                             type: "transformation",
//                             value: "w-100",
//                         },
//                     ],
//                 }}
//                 style={{ display: 'none' }} // hide the default input and use the custom upload button
//                 ref={ikUploadRefTest}
//             />
//             {
//                 uploading && (
//                     <div>
//                         uploading.....
//                     </div>
//                 )
//             }
//             {error && (
//                 <div>
//                     {error}
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";
import React, { FormEventHandler, useRef, useState } from "react";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/next";

interface FileUploadProps {
  onSuccess: (res: any) => any;
  onProgress?: (progress: number) => any;
  fileType?: "image" | "video";
}

const VideoUploadForm = ({
  onSuccess,
  onProgress,
  fileType = "video",
}: FileUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const abortController = new AbortController();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      console.log(data);
      return {
        signature: data.authenticationParameters.signature,
        expire: data.authenticationParameters.expire,
        token: data.authenticationParameters.token,
        publicKey: data.publicKey,
      };
    } catch (error) {
      console.log("imagekit auth error", error);
      throw new Error("ImageKit auth error");
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = fileInputRef.current;
    if (!fileInput) {
      alert("please select a file to upload");
      return;
    }
    if (!fileInput.files || fileInput.files.length === 0) {
      alert("please select a file to upload");
      return;
    }
    const file = fileInput.files[0];

    setUploading(true);

    let authParam;
    try {
      authParam = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }

    const { signature, expire, token, publicKey } = authParam;

    try {
      const uploadResponse: UploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
          if (onProgress) onProgress(Math.round((event.loaded / event.total) * 100));
        },
        
      });
      onSuccess(uploadResponse);
    } catch (error) {
      console.error("upload error", error);
      alert("upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div>
        <input ref={fileInputRef} type="file" accept="video/*" />
        <br />
        {uploading ?? <p>Uploading: {progress}</p>}
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default VideoUploadForm;
