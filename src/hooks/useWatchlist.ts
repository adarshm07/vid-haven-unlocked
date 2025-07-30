import { useState, useEffect } from "react";

const WATCHLIST_KEY = "video-watchlist";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse watchlist from localStorage:", error);
      }
    }
  }, []);

  const addToWatchlist = (videoId: string) => {
    const newWatchlist = [...watchlist, videoId];
    setWatchlist(newWatchlist);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (videoId: string) => {
    const newWatchlist = watchlist.filter(id => id !== videoId);
    setWatchlist(newWatchlist);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
  };

  const toggleWatchlist = (videoId: string) => {
    if (watchlist.includes(videoId)) {
      removeFromWatchlist(videoId);
    } else {
      addToWatchlist(videoId);
    }
  };

  const isInWatchlist = (videoId: string) => watchlist.includes(videoId);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };
};