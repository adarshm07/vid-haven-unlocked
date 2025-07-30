import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoCard, Video } from "@/components/VideoCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WatchlistButton } from "@/components/WatchlistButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useWatchlist } from "@/hooks/useWatchlist";
import { sampleVideos } from "@/data/sampleVideos";
import { Search, Play, Sparkles } from "lucide-react";
import { Header } from "@/components/Header"; // Import the new Header component

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const { watchlist, toggleWatchlist, isInWatchlist } = useWatchlist();

  // Separate featured video from the rest
  const featuredVideo = sampleVideos.find(video => video.isFeatured);
  const otherVideos = sampleVideos.filter(video => !video.isFeatured);

  const filteredVideos = otherVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWatchlist = !showWatchlistOnly || isInWatchlist(video.id);
    
    return matchesSearch && matchesWatchlist;
  });

  const watchlistVideos = sampleVideos.filter(video => isInWatchlist(video.id));

  return (
    <div className="min-h-screen bg-background">
      <Header /> {/* Add the Header component here */}

      {/* Hero Section (Updated Design) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 py-20 sm:py-28">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">VideoHub</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore a world of videos, curated just for you. Discover new content and build your watchlist.
          </p>
          <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Start Exploring
          </Button>
        </div>
        {/* Optional: Add a subtle pattern or image here */}
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {showWatchlistOnly 
                ? `Showing ${watchlistVideos.length} videos in your watchlist`
                : `Showing ${filteredVideos.length} of ${otherVideos.length} videos`
              }
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Featured Video Overlay (if applicable and not showing watchlist) */}
        {featuredVideo && !showWatchlistOnly && searchQuery === "" && (
           <div className="w-full py-8 cursor-pointer" onClick={() => setSelectedVideo(featuredVideo)}>
          <div className="relative w-full aspect-video group overflow-hidden">
            {/* Thumbnail */}
            <img
              src={featuredVideo.thumbnail}
              alt={featuredVideo.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <div className="text-center text-white px-4">
                <h3 className="text-2xl font-bold mb-2 line-clamp-2">{featuredVideo.title}</h3>
                <p className="text-lg text-muted-foreground">{featuredVideo.channel}</p>
              </div>
            </div>

             {/* Play Button on Hover */}
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="rounded-full border border-white text-white hover:bg-white/20"
                >
                    <Play className="w-8 h-8" />
                </Button>
             </div>
          </div>
        </div>
        )}

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
