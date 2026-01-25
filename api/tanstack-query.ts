import { useQueries } from "@tanstack/react-query";
import axios from "axios";

interface CustomListTypes {
  id: number;
  media_type: string;
  custom_image: string;
  custom_logo: string;
}

/**
 * Strategy 1: Lazy Loading - Only fetch visible slides
 * Fetch data only for the current slide and a few adjacent ones
 */
export function useReusableApi({
  custom_list,
  activeIndex = 0,
  prefetchRange = 2, // Fetch current + 2 ahead + 2 behind
}: {
  custom_list: CustomListTypes[];
  activeIndex?: number;
  prefetchRange?: number;
}) {
  return useQueries({
    queries: custom_list.map((item, index) => {
      // Only enable queries for slides near the active one
      const isInRange = Math.abs(index - activeIndex) <= prefetchRange;

      return {
        queryKey: ["get-by-id", item.media_type, item.id],
        enabled: !!item.id && isInRange,
        queryFn: async () => {
          const url = `https://api.themoviedb.org/3/${item.media_type}/${item.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&append_to_response=credits,images,videos`;
          const res = await axios.get(url);
          return {
            ...res.data,
            media_type: item.media_type,
            custom_image: item.custom_image,
            custom_logo: item.custom_logo,
          };
        },
        staleTime: Infinity, // Data won't change often
        gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes (renamed from cacheTime)
        refetchOnWindowFocus: false, // Prevent unnecessary refetches
        refetchOnMount: false,
      };
    }),
  });
}
