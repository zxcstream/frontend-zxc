import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MovieCard from "@/components/ui/movie-card";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ArrowRight, Film, Tv } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonCard1 from "@/components/ui/movie-card-skeleton-1";
import { swiperConfig } from "@/lib/swiper-config";
import { useIsMobile } from "@/hook/use-mobile";
import { MovieTypes } from "@/types/movie-by-id";
import { ReusableSwiperTypes } from "@/constants/movie-endpoints";
import { Button } from "@/components/ui/button";
import useGetDiscoverInfiniteSwiper from "@/api/get-discover-infinite swiper";

export default function ReusableSwiper({
  id,
  endpoint,
  params,
  displayName,
}: ReusableSwiperTypes) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const isMobile = useIsMobile();
  const [media_type, setMediaType] = useState<"movie" | "tv">("movie");
  const { data, isLoading } = useGetDiscoverInfiniteSwiper<MovieTypes>({
    endpoint,
    media_type,
    params,
    isVisible: inView,
  });
  const results = data?.pages.flatMap((p) => p.results) ?? [];
  const filtered = results.filter((filter) => filter.vote_average > 3);

  return (
    <div
      className=" mx-auto lg:w-[85%] w-[95%]  relative lg:py-15 py-8  border-b"
      ref={ref}
    >
      <div className="p-1 lg:mb-3  flex justify-between items-center gap-6">
        <div>
          <h2 className="lg:text-2xl text-base font-semibold  montserrat tracking-wide lg:mb-1 line-clamp-1">
            {displayName} {media_type === "movie" ? "Movies" : "TV Shows"}
          </h2>
          <Link
            href={`/browse/${id}`}
            prefetch={true}
            className="flex items-center lg:gap-2 gap-1 text-muted-foreground hover:underline transition duration-150  w-fit lg:text-base text-sm"
          >
            See more <ArrowRight className="lg:size-4 size-3.5" />
          </Link>
        </div>
        <div className="flex ">
          <span
            className={`border-b-2 ${media_type === "movie" ? "border-red-600" : ""}`}
          >
            <Button
              className=""
              onClick={() => setMediaType("movie")}
              variant="ghost"
            >
              <Film />
            </Button>
          </span>
          <span
            className={`border-b-2 ${media_type === "tv" ? "border-red-600" : ""}`}
          >
            <Button
              className=""
              onClick={() => setMediaType("tv")}
              variant="ghost"
            >
              <Tv />
            </Button>
          </span>
        </div>
      </div>

      {!inView || isLoading ? (
        <div className="grid lg:grid-cols-7 grid-cols-2 md:grid-cols-5 lg:gap-5 gap-2">
          {[...Array(isMobile ? 2 : 7)].map((_, i) => (
            <SkeletonCard1 key={i} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-center">No Data.</p>
      ) : (
        <Swiper {...swiperConfig}>
          {filtered.map((movie, i) => (
            <SwiperSlide key={movie.id} className="p-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: i * 0.03,
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
              >
                <MovieCard media_type={media_type} movie={movie} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
