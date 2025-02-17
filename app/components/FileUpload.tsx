"use client";
import React, { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void,
    onProgress: (res: number) => void,
    fileType?: "image" | "video"
}


export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image"
}: FileUploadProps) {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ikUploadRefTest = useRef(null);

    const onError = (err: {message: string}) => {
        console.log("Error", err);
        setError(err.message);
        setUploading(false);
    };

    const handleSuccess = (response: IKUploadResponse) => {
        console.log("Success", response);
        setUploading(false);
        setError(null);
        onSuccess(response);

    };

    const handleProgess = (evt: ProgressEvent) => {
        if(evt.lengthComputable && onProgress){
            const persentComplete = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(persentComplete))
        }
    };

    const handleStartUpload = () => {
        setUploading(true);
        setError(null)
    }; 

    const validateFile = (file: File) => {
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Please upload a video file");
                return false;
            }

            if(file.size > 100 * 1024 * 1024){
                setError("video must be less than 100 MB");
                return false;
            }
        }
        else{
            const validtypes = ["image/jpeg", "image/png", "image/webp"];
            if(!validtypes.includes(file.type)){
                setError("Please upload a vaild file");
                return false;
            }

            if(file.size > 5 * 1024 * 1024){
                setError("video must be less than 100 MB");
                return false;
            }
        }
        return false;
    }

    return (
        <div className="App">
            <IKUpload
                fileName="test-upload.jpg"
                validateFile={validateFile}
                
                onError={onError}
                onSuccess={handleSuccess}
                onUploadProgress={handleProgess}
                onUploadStart={handleStartUpload}
                folder={fileType === "video" ? "/videos": "/images"}
                transformation={{
                    pre: "l-text,i-Imagekit,fs-50,l-end",
                    post: [
                        {
                            type: "transformation",
                            value: "w-100",
                        },
                    ],
                }}
                style={{ display: 'none' }} // hide the default input and use the custom upload button
                ref={ikUploadRefTest}
            />
            {
                uploading && (
                    <div>
                        uploading.....
                    </div>
                )
            }
            {error && (
                <div>
                    {error}
                </div>
            )}
        </div>
    );
}