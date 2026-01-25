import { Button } from "@/components/ui/button";
import SkeletonCard1 from "@/components/ui/movie-card-skeleton-1";
import { Film, PenLine } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "motion/react";
import { useVideoProgressStore } from "@/store-player/videoProgressStore";
import { swiperConfigBackdrop } from "@/lib/swiper-config-backdrop";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { IconTrashXFilled } from "@tabler/icons-react";
export default function ContinueWatching() {
  const [clear, setClear] = useState(false);
  const clearProgress = useVideoProgressStore((state) => state.clearProgress);
  const progressList = Object.values(
    useVideoProgressStore((state) => state.progress),
  ).sort((a, b) => b.lastUpdated - a.lastUpdated);
  const [loaded, setLoaded] = useState(false);
  return (
    progressList.length !== 0 && (
      <div className=" mx-auto lg:w-[85%] w-[95%]  relative lg:py-15 py-8  border-b">
        <div className="p-1 lg:mb-3  flex justify-between items-center gap-6">
          <h2 className="lg:text-2xl text-base font-semibold  montserrat tracking-wide lg:mb-1 line-clamp-1">
            Continue Watching
          </h2>
          <Button variant="ghost" onClick={() => setClear((prev) => !prev)}>
            <PenLine className="size-5 text-muted-foreground" />
          </Button>
        </div>
        <Swiper {...swiperConfigBackdrop}>
          {progressList.map((movie, i) => {
            const key =
              movie.media_type === "movie"
                ? `movie-${movie.id}`
                : `tv-${movie.id}-s${movie.season}-e${movie.episode}`;
            return (
              <SwiperSlide key={i} className="p-1">
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
                  className="relative"
                >
                  <Link
                    href={`/watch/${movie.media_type}/${movie.id}${movie.media_type === "tv" ? `/${movie.season}/${movie.episode}` : ""}`}
                  >
                    <div className="relative group p-px rounded-sm bg-linear-to-b hover:to-red-800 from-transparent active:scale-98 active:from-red-800 transition duration-150 overflow-hidden">
                      <div className="aspect-video   rounded-sm  transition cursor-pointer overflow-hidden relative ">
                        <img
                          src={`${IMAGE_BASE_URL}/w780${movie.backdrop}`}
                          alt={movie.title}
                          className={`w-full h-full object-cover transition-opacity duration-300  ${loaded ? "opacity-100 " : "opacity-0"}`}
                          onLoad={() => setLoaded(true)}
                        />

                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/50 opacity-0 group-hover:opacity-100 transition duration-150"></div>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      <Slider
                        value={[movie.currentTime]}
                        max={movie.duration}
                        step={1}
                        className="mx-auto w-full max-w-xs pointer-events-none"
                      />
                      <h1 className="lg:text-sm text-xs  font-normal truncate">
                        {movie.title}{" "}
                        {movie.media_type === "tv"
                          ? `(S${movie.season}E${movie.episode})`
                          : ""}
                      </h1>
                      {/* <p className="text-xs text-muted-foreground">{movie.}</p> */}
                    </div>
                  </Link>
                  {clear && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="absolute top-0 right-0 "
                          variant="secondary"
                        >
                          <IconTrashXFilled className="size-6" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete {movie.title}{" "}
                            {movie.media_type === "tv"
                              ? `S${movie.season}E${movie.episode}`
                              : ""}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete from history.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => clearProgress(key)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
}
