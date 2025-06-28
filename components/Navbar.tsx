"use client"
import { useState } from 'react';
import { Home, Search, Plus, User, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { usePathname, useRouter } from 'next/navigation';


const NavigationBar = () => {
  const activeTab = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { id: 'home', path: '/home', icon: Home, label: 'Home' },
    { id: 'discover', path: '/discover', icon: Search, label: 'Discover' },
    { id: 'create', path: '/create', icon: Plus, label: 'Create', special: true },
    { id: 'activity', path: '/activity', icon: Heart, label: 'Activity' },
    { id: 'profile', path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">Shorts</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.path ? "default" : "ghost"}
                size="sm"
                className={`relative ${
                  item.special 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
                    : activeTab === item.path 
                      ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => router.push(item.path)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
                {item.path === '/activity' && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center">
                    3
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-purple-500/50">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                U
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-lg font-bold gradient-text">Shorts</span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start ${
                    item.special 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
                      : activeTab === item.path 
                        ? 'bg-purple-500/20 text-purple-300' 
                        : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push(item.path)
                  }}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                  {item.path === '/activity' && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs">3</Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 p-2 ${
                item.special 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full' 
                  : activeTab === item.path 
                    ? 'text-purple-300' 
                    : 'text-gray-400'
              }`}
              onClick={() => router.push(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
              {item.path === '/activity' && (
                <Badge className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 p-0 flex items-center justify-center">
                  3
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
