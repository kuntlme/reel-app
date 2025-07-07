"use client";
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IVideo } from "./VideoFeed";

interface VideoCardProps {
  video: IVideo;
  // onLike: (id: string) => void;
  // onComment: (id: string) => void;
  // onShare: (id: string) => void;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = useState(true);

  const handleVideoClick = () => {
    router.push(`/video/${video.videoid}`);
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300">
      {/* Video Thumbnail */}
      <div
        className="relative aspect-[9/16] bg-gradient-to-br from-purple-600 to-pink-600 cursor-pointer"
        onClick={handleVideoClick}
      >
        {/* <Image 
          src={video.sharelink + `/ik-thumbnail.jpg`} 
          alt={video.sharelink + `ik-thumbnail.jpg`}
          className="w-full h-full object-cover"
          height={300}
          width={100}
        /> */}
        <video
          src={video.sharelink}
          className="w-full h-full object-cover"
          height={300}
          width={100}
        ></video>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button
            size="lg"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
              router.push(`/video/${video.videoid}`);
            }}
          >
            {/* {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />} */}
            <Play className="h-8 w-8" />
          </Button>
        </div>

        {/* Duration Badge */}
        {/* <Badge className="absolute top-3 right-3 bg-black/50 text-white border-0">
          {video.duration}
        </Badge> */}

        {/* Sound Toggle */}
        {/* <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button> */}

        {/* Engagement Buttons */}
        {/* <div className="absolute right-3 bottom-16 flex flex-col gap-3">
          <Button
            size="sm"
            variant="ghost"
            className={`rounded-full bg-black/50 hover:bg-black/70 text-white ${
              video.isLiked ? 'text-red-500' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onLike(video.id);
            }}
          >
            <Heart className={`h-5 w-5 ${video.isLiked ? 'fill-current' : ''}`} />
          </Button>
          <span className="text-xs text-white text-center">{video.likes}</span>

          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onComment(video.id);
            }}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <span className="text-xs text-white text-center">{video.comments}</span>

          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onShare(video.id);
            }}
          >
            <Share className="h-5 w-5" />
          </Button>
          <span className="text-xs text-white text-center">{video.shares}</span>
        </div> */}
      </div>

      {/* Video Info */}
      <div
        className="p-4 space-y-3"
      >
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-purple-500/50 cursor-pointer" onClick={() => router.push(`/profile/${video.uploader.userid}`)}>
            {/* <AvatarImage src={"ds"} alt={video.videoid.charAt(0)} /> */}
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {video.uploader.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">
              {video.description}
            </h3>
            <p className="text-sm text-gray-400">@{video.uploader.username}</p>
            <p className="text-xs text-gray-500">{video.viewcount} views</p>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Tags */}
        {/* <div className="flex flex-wrap gap-2">
          {video.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
            >
              #{tag}
            </Badge>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default VideoCard;
