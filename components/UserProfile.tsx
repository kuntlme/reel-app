"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, Calendar, LogOut, Edit3 } from "lucide-react";
import VideoCard from "./VideoCard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { signOut, useSession } from "next-auth/react";
import { IVideo } from "./VideoFeed";

export interface IUser {
  email: string;
  userid: string;
  password: string;
  profilename: string;
  username: string;
  joining_date: string;
  location: string;
  creator?: {
    userid: string;
    total_videos_uploaded: number;
  };
  viewer?: {
    userid: string;
    total_interactions: number;
  };
}

const UserProfile = ({ userid }: { userid: string }) => {
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = useState<IUser | null>(null);
  const [userVideos, setUserVideos] = useState<IVideo[] | []>([]);

  // fetch user details
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(`/api/users/${userid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setUserVideos(data.videos);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
      toast("something error");
    }
  }, [userid]);

  const handleLogout = async () => {
    await signOut();
    toast("You have been successfully logged out.");
    router.push("/");
    // window.location.reload(); // Force refresh to update auth state
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
                {/* <AvatarImage src={user.avatar} alt={user.displayName} /> */}
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-4xl">
                  {user.username.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      {user.profilename}
                    </h1>
                    <p className="text-gray-400">@{user.username}</p>
                  </div>

                  {user.userid === session.data?.user?.id && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                        onClick={() => router.push("/profile/edit-profile")}
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
                  )}
                </div>

                {/* Stats */}
                {/* <div className="flex justify-center md:justify-start gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">
                      { userVideos?.length || 0}
                    </div>
                    <div className="text-gray-400 text-sm">Videos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">
                      {user.followers || "1.2K"}
                    </div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">
                      {user.following || "890"}
                    </div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                </div> */}

                {/* Bio */}
                {user.email && (
                  <p className="text-gray-300 mb-4 max-w-md">{user.email}</p>
                )}

                {/* Website */}
                {/* {user.website && (
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
                )} */}

                {/* Join Date */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Joined{" "}
                    {
                      user?.joining_date.split("T")[0]
                      // || new Date().toLocaleDateString(
                      //   "en-US",
                      //   {
                      //     month: "long",
                      //     year: "numeric",
                      //   }
                      // )
                    }
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
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
            >
              {userVideos.length} videos
            </Badge>
          </div>

          {userVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userVideos.map((video) => (
                <VideoCard key={video.videoid} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No videos yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start creating and sharing your amazing content!
              </p>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => router.push("/")}
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
