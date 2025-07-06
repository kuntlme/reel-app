import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Badge } from './ui/badge'

const CustomVideo = () => {
  return (
    <div className='relative group overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300'>
        {/* Video Thumbnail */}
        <div className='relative aspect-[9/16] bg-gradient-to-br from-purple-600 to-pink-600 cursor-pointer'>
        </div>
        {/* Video Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-purple-500/50">
            <AvatarImage src={video.avatar} alt={video.creator} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {video.creator.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{video.title}</h3>
            <p className="text-sm text-gray-400">@{video.creator}</p>
            <p className="text-xs text-gray-500">{video.views} views</p>
          </div>

          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomVideo