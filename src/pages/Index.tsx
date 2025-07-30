import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoCard, Video } from "@/components/VideoCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WatchlistButton } from "@/components/WatchlistButton";
import { useWatchlist } from "@/hooks/useWatchlist";
import { sampleVideos } from "@/data/sampleVideos";
import { Search, Play, Sparkles } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const { watchlist, toggleWatchlist, isInWatchlist } = useWatchlist();

  const filteredVideos = sampleVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWatchlist = !showWatchlistOnly || isInWatchlist(video.id);
    
    return matchesSearch && matchesWatchlist;
  });

  const watchlistVideos = sampleVideos.filter(video => isInWatchlist(video.id));

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Play className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VideoHub
              </h1>
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, watch, and curate your favorite YouTube videos in one beautiful place
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant={!showWatchlistOnly ? "default" : "glass"}
              onClick={() => setShowWatchlistOnly(false)}
            >
              All Videos ({sampleVideos.length})
            </Button>
            <WatchlistButton
              watchlistCount={watchlist.length}
              onToggle={() => setShowWatchlistOnly(!showWatchlistOnly)}
              isActive={showWatchlistOnly}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            {showWatchlistOnly 
              ? `Showing ${watchlistVideos.length} videos in your watchlist`
              : `Showing ${filteredVideos.length} of ${sampleVideos.length} videos`
            }
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={setSelectedVideo}
                isInWatchlist={isInWatchlist(video.id)}
                onToggleWatchlist={toggleWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {showWatchlistOnly ? "No videos in your watchlist" : "No videos found"}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {showWatchlistOnly 
                ? "Start adding videos to your watchlist to see them here."
                : "Try adjusting your search terms or browse all videos."
              }
            </p>
            {(showWatchlistOnly || searchQuery) && (
              <Button
                variant="glass"
                className="mt-4"
                onClick={() => {
                  setShowWatchlistOnly(false);
                  setSearchQuery("");
                }}
              >
                Show All Videos
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <VideoPlayer
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isInWatchlist={selectedVideo ? isInWatchlist(selectedVideo.id) : false}
        onToggleWatchlist={toggleWatchlist}
      />
    </div>
  );
};

export default Index;
