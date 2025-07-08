"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IUser } from "@/components/UserProfile";
import { useSession } from "next-auth/react";

const EditProfile = () => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState<IUser>({
    userid: "",
    username: "",
    profilename: "",
    email: "",
    password: "",
    joining_date: "",
    location: "",
    // bio: '',
    // website: '',
    // avatar: '/placeholder.svg'
  });

  // Load user profile from localStorage
  useEffect(() => {
    console.log(session)
    if (session) {
      const fetchData = async () => {
        const res = await fetch(`/api/users/${session.data?.user?.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        if (data && data.user) {
          setProfile((profile) => ({
            ...profile,
            username: data.user.username,
            userid: data.user.userid,
            profilename: data.user.profilename,
            email: data.user.email,
            location: data.user.location,
            // bio: user.bio || '',
            // website: user.website || '',
            // avatar: user.avatar || '/placeholder.svg'
          }));
        }
      };
      fetchData();
    }
  }, [session]);

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    // Simulate API call
    e.preventDefault();
    try {
      console.log("enter");
      const res = await fetch(`/api/users/${profile.userid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          profilename: profile.profilename,
        }),
      });
      console.log("entering");
      console.log(await res.json());
      toast("profile edited");
      router.back();
    } catch (error) {
      toast("upload failed");
      throw new Error("edit failed" + error);
    }
  };

  //   const handleAvatarChange = () => {
  //     // In a real app, this would open file picker and upload image
  //     toast("Avatar upload functionality would be implemented here.");
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold gradient-text">
              Edit Profile
            </span>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <Card className="glass-effect border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="gradient-text text-2xl">
                Update Your Profile
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-purple-500/50">
                    {/* <AvatarImage src={profile.avatar} alt="Profile" /> */}
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">
                      {profile.username.charAt(0).toUpperCase() ||
                        profile.username.charAt(0) ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>

                  {/* <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={handleAvatarChange}
                  >
                    <Camera className="h-4 w-4" />
                  </Button> */}
                </div>

                {/* <p className="text-sm text-gray-400">Click the camera icon to change your avatar</p> */}
              </div>

              {/* Form Fields */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    placeholder="Enter your username"
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-white">
                    Display Name
                  </Label>
                  <Input
                    id="profilename"
                    value={profile.profilename}
                    onChange={(e) =>
                      handleInputChange("profilename", e.target.value)
                    }
                    placeholder="Enter your display name"
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                    disabled
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div> */}

                {/* <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-gray-300 hover:bg-white/5"
                  onClick={() => router.push("/")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
