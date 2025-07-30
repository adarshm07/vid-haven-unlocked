import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Search, Sparkles, Youtube } from "lucide-react"; // Import Youtube icon
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const youtubeChannelUrl = "https://www.youtube.com/@GoogleForDevelopers"; // Example YouTube channel

  const handleSubscribeClick = () => {
    window.open(youtubeChannelUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo or Site Title */}
        <div className="flex items-center gap-2">
          <Play className="w-8 h-8 text-primary" /> {/* Larger icon */}
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Akam India {/* Larger text, updated name */}
          </span>
        </div>

        {/* Navigation (Placeholder) */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground hover:text-primary">Home</Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">Browse</Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">Watchlist</Button>
        </nav>

        {/* Search, Subscribe and Theme Toggle */}
        <div className="flex items-center gap-4">
           {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 w-40 bg-card/50 border-border/50 focus:border-primary text-foreground"
            />
          </div>
          
          {/* Subscribe Button */}
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleSubscribeClick}
            className="bg-red-600 text-white hover:bg-red-700 hidden sm:flex items-center"
          >
            <Youtube className="w-4 h-4 mr-2" />
            Subscribe
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
