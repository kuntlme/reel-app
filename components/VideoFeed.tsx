"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, Clock, Flame } from 'lucide-react';
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
}

const VideoFeed = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filterType, setFilterType] = useState<'trending' | 'recent' | 'popular'>('trending');

  // Sample video data - in a real app this would come from an API
  const sampleVideos: Video[] = [
    {
      id: '1',
      title: 'Amazing Dance Moves You Need to See! 🔥',
      creator: 'DanceQueen',
      avatar: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      duration: '0:15',
      views: '2.3M',
      likes: 45600,
      comments: 1230,
      shares: 890,
      isLiked: false,
      tags: ['dance', 'viral', 'trending']
    },
    {
      id: '2',
      title: 'Life Hack That Will Blow Your Mind 🤯',
      creator: 'LifeHacker',
      avatar: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      duration: '0:30',
      views: '1.8M',
      likes: 32400,
      comments: 890,
      shares: 567,
      isLiked: true,
      tags: ['lifehack', 'useful', 'diy']
    },
    {
      id: '3',
      title: 'Cute Puppy Compilation 🐕',
      creator: 'PetLover',
      avatar: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      duration: '0:25',
      views: '5.1M',
      likes: 78900,
      comments: 2340,
      shares: 1230,
      isLiked: false,
      tags: ['pets', 'cute', 'animals']
    },
    {
      id: '4',
      title: 'Quick Recipe: 2-Minute Pasta 🍝',
      creator: 'FoodieChef',
      avatar: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      duration: '0:45',
      views: '890K',
      likes: 15600,
      comments: 456,
      shares: 234,
      isLiked: false,
      tags: ['cooking', 'recipe', 'quick']
    },
    {
      id: '5',
      title: 'Street Art Time-lapse ✨',
      creator: 'UrbanArtist',
      avatar: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      duration: '1:00',
      views: '1.2M',
      likes: 28700,
      comments: 670,
      shares: 445,
      isLiked: true,
      tags: ['art', 'creative', 'timelapse']
    },
    {
      id: '6',
      title: 'Epic Skateboard Trick 🛹',
      creator: 'SkateKing',
      avatar: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      duration: '0:20',
      views: '3.4M',
      likes: 67800,
      comments: 1890,
      shares: 1020,
      isLiked: false,
      tags: ['skateboard', 'tricks', 'sports']
    }
  ];

  useEffect(() => {
    // Load videos from localStorage or use sample data
    const savedVideos = localStorage.getItem('shortsVideos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      setVideos(sampleVideos);
      localStorage.setItem('shortsVideos', JSON.stringify(sampleVideos));
    }
  }, []);

  const saveVideos = (updatedVideos: Video[]) => {
    setVideos(updatedVideos);
    localStorage.setItem('shortsVideos', JSON.stringify(updatedVideos));
  };

  const handleLike = (videoId: string) => {
    const updatedVideos = videos.map(video => {
      if (video.id === videoId) {
        return {
          ...video,
          isLiked: !video.isLiked,
          likes: video.isLiked ? video.likes - 1 : video.likes + 1
        };
      }
      return video;
    });
    saveVideos(updatedVideos);
  };

  const handleComment = (videoId: string) => {
    console.log('Opening comments for video:', videoId);
    // In a real app, this would open a comments modal
  };

  const handleShare = (videoId: string) => {
    console.log('Sharing video:', videoId);
    // In a real app, this would open share options
  };

  const handleRefresh = () => {
    // Shuffle videos to simulate new content
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    saveVideos(shuffled);
  };

  const filterButtons = [
    { key: 'trending', label: 'Trending', icon: TrendingUp },
    { key: 'recent', label: 'Recent', icon: Clock },
    { key: 'popular', label: 'Popular', icon: Flame },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      {/* Filter Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filterButtons.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={filterType === key ? "default" : "ghost"}
                size="sm"
                className={
                  filterType === key 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }
                onClick={() => setFilterType(key as any)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-white/10"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto p-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default VideoFeed;
