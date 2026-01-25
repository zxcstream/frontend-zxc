// components/WatchlistButton.tsx
"use client";
import { useWatchlist } from "./watchlist";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MovieTypes } from "@/types/movie-by-id";
interface Props {
  movie: MovieTypes;
}

export interface SaveWatchlistType {
  id: number;
  title: string;
  media_type: string;
  backdrop: string;
  year: string;
}
export function WatchlistButton({ movie }: Props) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const id = movie.id;
  const title = movie.title || movie.name || "";
  const media_type = movie.media_type;
  const backdrop =
    movie?.images?.backdrops?.find((b) => b.iso_639_1 === "en")?.file_path ||
    "";
  const year = movie?.release_date || movie?.first_air_date || "";
  return (
    <Button
      onClick={() => toggleWatchlist({ id, title, media_type, backdrop, year })}
      size="xl"
      variant="outline"
    >
      <Bookmark
        strokeWidth={3}
        className={` ${
          isInWatchlist(movie.id, movie.media_type)
            ? "text-red-700 fill-red-700"
            : ""
        }`}
      />
      {isInWatchlist(movie.id, movie.media_type)
        ? "Remove to List"
        : "Add to List"}
    </Button>
  );
}

//  <Tooltip>
//    <TooltipTrigger asChild>
//      <Button
//        onClick={() =>
//          toggleWatchlist({ id, title, media_type, backdrop, year })
//        }
//      >
//        <Bookmark
//          className={` ${
//            isInWatchlist(movie.id, movie.media_type) ? "fill-current" : ""
//          }`}
//        />
//      </Button>
//    </TooltipTrigger>
//    <TooltipContent className=" px-2 py-1 text-xs zxc">
//      {isInWatchlist(movie.id, movie.media_type)
//        ? "Remove to watchlist"
//        : "Add to watchlist"}
//    </TooltipContent>
//  </Tooltip>;
