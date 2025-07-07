"use client"
import { Play, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const Landing = () => {
  const router = useRouter()
  // Mock check for user authentication - in real app this would come from auth context

  const features = [
    {
      icon: Play,
      title: 'Create Amazing Shorts',
      description: 'Share your creativity with the world through engaging short videos'
    },
    {
      icon: TrendingUp,
      title: 'Trending Content',
      description: 'Discover the latest viral videos and trending topics'
    },
    {
      icon: Users,
      title: 'Connect with Creators',
      description: 'Follow your favorite creators and build your community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">Shorts</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => window.location.href = '/register'}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span className="text-purple-400 font-medium">Welcome to the Future of Short Videos</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Create. Share. <span className="gradient-text">Inspire.</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join millions of creators sharing their stories through captivating short videos. 
            Your creativity has no limits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4"
              onClick={() => window.location.href = '/signup'}
            >
              Start Creating
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 text-lg px-8 py-4"
              onClick={() => window.location.href = '/signin'}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            Why Choose Shorts?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-effect rounded-2xl p-8 text-center hover:border-purple-500/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Ready to Go Viral?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join our community of creators and start sharing your unique perspective with the world.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-12 py-4"
              onClick={() => window.location.href = '/signup'}
            >
              Join Now - It&apos;s Free!
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Shorts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
