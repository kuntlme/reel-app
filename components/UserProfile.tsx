"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, Globe, Calendar, LogOut, Edit3 } from 'lucide-react';
import VideoCard from './VideoCard';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent } from './ui/card';

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({
        id: Date.now().toString(),
        username: 'demo_user',
        displayName: 'Demo User',
        bio: 'Creative content creator passionate about sharing amazing moments through short videos! ✨',
        website: 'https://example.com',
        avatar: '/placeholder.svg',
        followers: 1250,
        following: 890,
        videos: 45,
        createdAt: new Date().toISOString()
      });
  const [userVideos, setUserVideos] = useState<any[]>([]);

  useEffect(() => {
    // Load user data from localStorage
    if (user) {
      
      // Mock user videos - in real app this would come from API
      const mockVideos = [
        {
          id: '1',
          title: 'My Amazing Dance Routine',
          creator: user.username,
          avatar: user.avatar,
          thumbnail: '/placeholder.svg',
          duration: '0:45',
          views: '12K',
          likes: 245,
          comments: 18,
          shares: 12,
          isLiked: false,
          tags: ['dance', 'trending']
        },
        {
          id: '2',
          title: 'Cooking Tips & Tricks',
          creator: user.username,
          avatar: user.avatar,
          thumbnail: '/placeholder.svg',
          duration: '1:20',
          views: '8.5K',
          likes: 189,
          comments: 24,
          shares: 8,
          isLiked: false,
          tags: ['cooking', 'tips']
        }
      ];
      setUserVideos(mockVideos);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast("You have been successfully logged out.", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo")
      }
    });
    router.push('/');
    window.location.reload(); // Force refresh to update auth state
  };

  const handleLike = (id: string) => {
    setUserVideos(prev => prev.map(video => {
      if (video.id === id) {
        return {
          ...video,
          isLiked: !video.isLiked,
          likes: video.isLiked ? video.likes - 1 : video.likes + 1
        };
      }
      return video;
    }));
  };

  const handleComment = (id: string) => {
    router.push(`/video/${id}`);
  };

  const handleShare = (id: string) => {
    toast("Sharing functionality would be implemented here.", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo")
      }
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20 pb-24 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <Card className="glass-effect border-white/10 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <Avatar className="h-32 w-32 ring-4 ring-purple-500/50">
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-4xl">
                  {user.displayName?.charAt(0) || user.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      {user.displayName || user.username}
                    </h1>
                    <p className="text-gray-400">@{user.username}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                      onClick={() => router.push('/edit-profile')}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center md:justify-start gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{user.videos || userVideos.length}</div>
                    <div className="text-gray-400 text-sm">Videos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{user.followers || '1.2K'}</div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{user.following || '890'}</div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                </div>

                {/* Bio */}
                {user.bio && (
                  <p className="text-gray-300 mb-4 max-w-md">
                    {user.bio}
                  </p>
                )}

                {/* Website */}
                {user.website && (
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Globe className="h-4 w-4 text-purple-400" />
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {user.website}
                    </a>
                  </div>
                )}

                {/* Join Date */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Joined {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Videos */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold gradient-text">My Videos</h2>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {userVideos.length} videos
            </Badge>
          </div>

          {userVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No videos yet</h3>
              <p className="text-gray-400 mb-6">Start creating and sharing your amazing content!</p>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => router.push('/')}
              >
                Create Your First Video
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
