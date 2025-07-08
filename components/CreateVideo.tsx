"use client";
import React, { useRef, useState } from "react";
import { Upload, Camera, Hash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { upload } from "@imagekit/next";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UploadResponse = {
  name?: string;
  url?: string;
  // add other properties if needed
};

const CreateVideo = () => {
  // const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  // const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [onSuccess, setOnsuccess] = useState(false);
  const [response, setResponse] = useState<UploadResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  const handleUpload = async () => {
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

    setIsUploading(true);

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
        },
      });
      setResponse(uploadResponse);
      console.log(uploadResponse);
      toast("uploaded to imagekit");
    } catch (error) {
      console.error("upload error", error);
      alert("upload failed");
    } finally {
      setIsUploading(false);
    }
  };



  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsUploading(true);

  //   // Simulate upload process
  //   setTimeout(() => {
  //     console.log('Video uploaded!', { title, description, tags, videoFile, thumbnail });

  //     // Reset form
  //     setTitle('');
  //     setDescription('');
  //     setTags([]);
  //     setVideoFile(null);
  //     setThumbnail(null);
  //     setIsUploading(false);

  //     alert('Video uploaded successfully!');
  //   }, 2000);
  // };

  const hadlleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!response || !description) return;
    try {
      const date = new Date().toISOString();
      console.log(date);
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          description: description,
          sharelink: response.url,
          uploaded_at: date,
        }),
      });
      console.log(await res.json());
      toast("file submitted");
      router.push("/home");
      
    } catch (error) {
      throw new Error("upload failed" + error);
      toast("upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Create New Short
          </h1>
          <p className="text-gray-400">Share your creativity with the world</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Camera className="h-5 w-5 text-purple-400" />
                Upload Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Upload */}
              <div>
                <Label className="text-gray-300">Video File</Label>
                <div className="mt-2 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                  {videoFile ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mx-auto flex items-center justify-center">
                        <Camera className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-300">{videoFile.name}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setVideoFile(null)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">
                          Drop your video here or
                        </p>
                        <input
                          type="file"
                          accept="video/*"
                          id="video-upload"
                          className="hidden"
                          onChange={(e) => {
                            setVideoFile(e.target.files?.[0] || null);
                            handleUpload();
                          }}
                          ref={fileInputRef}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                          onClick={() =>
                            document.getElementById("video-upload")?.click()
                          }
                        >
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Upload */}
              {/* <div>
                <Label className="text-gray-300">Thumbnail (Optional)</Label>
                <div className="mt-2 border border-gray-600 rounded-lg p-4">
                  {thumbnail ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {thumbnail.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setThumbnail(null)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        id="thumbnail-upload"
                        className="hidden"
                        onChange={(e) =>
                          setThumbnail(e.target.files?.[0] || null)
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-gray-400 hover:text-white"
                        onClick={() =>
                          document.getElementById("thumbnail-upload")?.click()
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Custom Thumbnail
                      </Button>
                    </div>
                  )}
                </div>
              </div> */}

              {videoFile && (
                <div>
                  <Progress value={progress} max={100} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details Section */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Video Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form /* onSubmit={handleSubmit} */ className="space-y-6">
                {/* Title */}
                {/* <div>
                  <Label htmlFor="title" className="text-gray-300">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your video a catchy title..."
                    className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div> */}

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell viewers about your video..."
                    className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 resize-none"
                    rows={4}
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Tags
                  </Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag..."
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      Add
                    </Button>
                  </div>

                  {/* Display Tags */}
                  {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-purple-200 hover:text-white"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  onClick={hadlleSubmit}
                  disabled={!description || isUploading || !response}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    "Upload Video"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
