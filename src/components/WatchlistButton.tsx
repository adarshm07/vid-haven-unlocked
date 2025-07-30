import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListVideo } from "lucide-react";

interface WatchlistButtonProps {
  watchlistCount: number;
  onToggle: () => void;
  isActive: boolean;
}

export const WatchlistButton = ({ watchlistCount, onToggle, isActive }: WatchlistButtonProps) => {
  return (
    <Button
      variant={isActive ? "default" : "glass"}
      onClick={onToggle}
      className="relative"
    >
      <ListVideo className="w-4 h-4" />
      My Watchlist
      {watchlistCount > 0 && (
        <Badge 
          variant="secondary" 
          className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5"
        >
          {watchlistCount}
        </Badge>
      )}
    </Button>
  );
};