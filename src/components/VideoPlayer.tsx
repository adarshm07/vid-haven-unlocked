import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Plus, Check, ExternalLink } from "lucide-react";
import { Video } from "./VideoCard";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  video: Video | null;
  onClose: () => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (videoId: string) => void;
}

export const VideoPlayer = ({ video, onClose, isInWatchlist, onToggleWatchlist }: VideoPlayerProps) => {
  if (!video) return null;

  const youtubeUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-4xl bg-gradient-card border-border/50 shadow-glow animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground truncate">
              {video.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {video.channel} • {video.views} views
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
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
                <>
                  <Check className="w-4 h-4" />
                  In Watchlist
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add to Watchlist
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              YouTube
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video">
          <iframe
            src={youtubeUrl}
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Description */}
        {video.description && (
          <div className="p-4 border-t border-border/50">
            <h3 className="font-medium text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {video.description}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};