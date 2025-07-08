"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
  Send,
  MoreHorizontal,
  Pause,
  Play,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { IVideo } from "@/components/VideoFeed";
import { toast } from "sonner";

interface IComment {
  interaction_id: string;
  comment_text: string;
  interaction: {
    user: {
      userid: string;
      username: string;
    };
  };
}

const VideoPage = () => {
  const { videoid } = useParams<{ videoid: string }>();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);



  //increase viewcount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/videos/${videoid}/viewcount`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if(res.ok) console.log("done");
    };
    fetchData();
  }, [videoid]);

  //fetch video from server
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/videos/${videoid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setVideo(data);
    };
    fetchData();
  }, [videoid]);

  // fetch comments and likes from the server
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/videos/${videoid}/interactions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setComments(data.comments);
      setIsLiked(!!data.isLike);
      setLikeCount(data.likes);
    };
    fetchData();
  }, [videoid]);

  const handleAddComment = async () => {
    if (newComment.trim() && video) {
      try {
        const res = await fetch(`/api/videos/${videoid}/interactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: "comment", comment_text: newComment }),
        });
        const data = await res.json();
        const tempComment: IComment = {
          interaction_id: data.interaction_id,
          comment_text: newComment,
          interaction: {
            user: {
              userid: video.uploader_id,
              username: video.uploader.username,
            },
          },
        };
        setComments([tempComment, ...comments]);
        setNewComment("");
        toast("Comment added");
      } catch {
        toast("Comment failed");
      }
    }
  };

  const handleLike = async () => {
    if (!isLiked) {
      try {
        const res = await fetch(`/api/videos/${videoid}/interactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: "like" }),
        });
        const data = await res.json();
        if (data) setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        toast("Liked");
      } catch {
        toast("Like failed");
      }
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white">Shorts</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Video Section */}
            <div className="space-y-6">
              <div className="aspect-[9/16] max-w-md mx-auto rounded-2xl overflow-hidden relative bg-black group">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={video.sharelink}
                  playsInline
                  autoPlay
                  loop                />

                {/* Custom Play/Pause button */}
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="w-16 h-16" />
                  ) : (
                    <Play className="w-16 h-16" />
                  )}
                </button>

                {/* Like & Share */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`rounded-full bg-black/50 hover:bg-black/70 text-white ${
                      isLiked ? "text-red-500" : ""
                    }`}
                    onClick={handleLike}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <span className="text-xs text-white text-center">
                    {likeCount}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full bg-black/50 hover:bg-black/70 text-white"
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Info and Comments */}
            <div className="space-y-6">
              <div className="rounded-2xl p-6 space-y-4 bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-purple-500/50 cursor-pointer" onClick={() => router.push(`/profile/${video.uploader.userid}`)}>
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      {video.uploader.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <span>@{video.uploader.username}</span>
                      <span>•</span>
                      <span>{video.viewcount} views</span>
                      <span>•</span>
                      <span>{video.uploaded_at.split("T")[0]}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl p-6 space-y-4 bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="h-5 w-5 text-purple-400" />
                  <h3 className="font-semibold text-white">
                    Comments ({comments.length})
                  </h3>
                </div>

                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 cursor-pointer" onClick={()=> router.push(`/profile/${video.uploader.userid}`)}>
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                      {video.uploader.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddComment()
                      }
                    />
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={handleAddComment}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.interaction_id} className="flex gap-3">
                      <Avatar className="h-8 w-8 cursor-pointer" onClick={() => router.push(`/profile/${comment.interaction.user.userid}`)}>
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                          {comment.interaction.user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-black/20 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white text-sm">
                              {comment.interaction.user.username}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {comment.comment_text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
