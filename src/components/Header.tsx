import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo or Site Title */}
        <div className="flex items-center gap-2">
          <Play className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            VideoHub
          </span>
        </div>

        {/* Navigation (Placeholder) */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground hover:text-primary">Home</Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">Browse</Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">Watchlist</Button>
        </nav>

        {/* Search and User (Placeholder) */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 w-40 bg-card/50 border-border/50 focus:border-primary text-foreground"
            />
          </div>
          {/* <Button variant="ghost" size="icon"><UserCircle2 className="w-5 h-5" /></Button> */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
