"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface IntroTypes {
  imdb_id: string;
  season: number;
  episode: number;
  start_sec: number;
  end_sec: number;
  start_ms: number;
  end_ms: number;
  confidence: number;
  submission_count: number;
  updated_at: number;
}
export default function useIntro({
  id,
  season,
  episode,
  media_type,
}: {
  id: string;
  season: number;
  episode: number;
  media_type: string;
}) {
  const query = useQuery<IntroTypes>({
    queryKey: ["get-by-id", media_type, id, season, episode],
    enabled: media_type === "tv" && !!id,
    queryFn: async () => {
      const url = `/api/intro?imdbId=${id}&season=${season}&episode=${episode}`;

      try {
        const res = await axios.get(url);

        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
