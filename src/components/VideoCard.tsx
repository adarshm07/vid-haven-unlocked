import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Play, Plus, Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
  views: string;
  channel: string;
}

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (videoId: string) => void;
}

export const VideoCard = ({ video, onPlay, isInWatchlist, onToggleWatchlist }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = () => {
    // Implement share functionality here
    // For now, let's just log the video title
    console.log(`Sharing: ${video.title}`);
    // In a real application, you would use the Web Share API or a custom share dialog
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
      }).catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      // You could copy the URL to the clipboard or open a share dialog
      console.log("Web Share API not supported");
      // Example: Copy to clipboard (requires navigator.clipboard)
      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${video.youtubeId}`).then(() => {
        alert("Video URL copied to clipboard!");
      }).catch((err) => {
        console.error("Could not copy text: ", err);
      });
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-[1.02] animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Play Button Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={() => onPlay(video)}
            className="rounded-full border border-white text-white hover:bg-white/20"
          >
            <Play className="w-6 h-6" />
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {video.channel}
          </p>
          <p className="text-xs text-muted-foreground">
            {video.views} views
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="glass"
            size="sm"
            onClick={() => onPlay(video)}
            className="flex-1 mr-2"
          >
            <Play className="w-4 h-4" />
            Watch
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="transition-colors text-muted-foreground hover:text-primary"
          >
            <Share2 className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleWatchlist(video.id)}
            className={cn(
              "transition-colors",
              isInWatchlist 
                ? "text-primary hover:text-primary/80" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {isInWatchlist ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};