import { Button } from "@/components/ui/button";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { MovieTypes } from "@/types/movie-by-id";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Volume, Volume2, VolumeOff } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hook/use-mobile";
import { WatchlistButton } from "../watchlist/watchlist-button";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import {
  IconBrandYoutubeFilled,
  IconVideo,
  IconVideoFilled,
  IconVideoOff,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
export default function LandingContent({
  isSearching,
  isActive,
  data,
}: {
  isSearching: boolean;
  isActive: boolean;
  data: MovieTypes;
}) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trailerError, setTrailerError] = useState(false);
  const [muted, setMuted] = useState(false);
  const logo = useMemo(
    () => data.images?.logos?.find((l) => l.iso_639_1 === "en")?.file_path,
    [data.images?.logos],
  );
  const trailerKey = data.videos.results.find(
    (f) => f.type === "Trailer" && f.official === true,
  )?.key;

  useEffect(() => {
    if (
      playing &&
      pathname !== "/" &&
      pathname !== "/movie" &&
      pathname !== "/tv"
    ) {
      setPlaying(false);
    }
  }, [pathname, playing]);

  return (
    <motion.div
      initial={false}
      animate={{
        height: isSearching ? 0 : isMobile ? "75vh" : "100vh",
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative overflow-hidden"
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="relative overflow-hidden w-full grid place-items-center   h-dvh  lg:mask-[linear-gradient(to_left,black_40%,transparent_100%)]
               lg:mask-size-[100%_100%]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              src={`https://www.youtube.com/embed/${trailerKey}`}
              loop={false}
              width="130%"
              height="130%"
              onReady={() => {
                console.log("Ready");
                // Also try to get duration on ready
                // if (
                //   playerRef.current?.duration &&
                //   isFinite(playerRef.current.duration)
                // ) {
                //   setDuration(playerRef.current.duration);
                // }
              }}
              playing={playing}
              muted={muted}
              onStart={() => console.log("Started")}
              onPlay={() => console.log("Playing")}
              onPause={() => console.log("Paused")}
              onEnded={() => {
                console.log("Ended");

                setPlaying(false);
              }}
              onError={() => {
                console.log("ERROR");
                setTrailerError(true);
              }}
              onWaiting={() => console.log("Started")}
              onPlaying={() => console.log("Started")}
              // onTimeUpdate={console.log("Started")}
              // onDurationChange={console.log("Started")}
              // onProgress={console.log("Started")}
              className="bg-black pointer-events-none"
            />
            {!playing && (
              <motion.img
                src={`${IMAGE_BASE_URL}/original${data.custom_image ? data.custom_image : data.backdrop_path}`}
                alt={data.title || data.name}
                className={`absolute object-cover w-full h-full 
            ${loaded ? "opacity-100 " : "opacity-0"}`}
                onLoad={() => setLoaded(true)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/*IMAGE */}
      <div className="absolute inset-0 bg-linear-to-b lg:from-transparent from-background/80 via-transparent to-background pointer-events-none " />
      <div className="absolute flex items-center  lg:bottom-25 bottom-5 left-1/2 -translate-x-1/2 lg:w-[85%] w-[95%]  ">
        <div className="lg:max-w-[45%] ">
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="lg:mb-8 mb-3 lg:max-w-lg max-w-58   overflow-hidden"
              >
                {data.images.logos.length === 0 ? (
                  <h1 className="lg:text-6xl text-4xl  font-bold">
                    {data.title || data.name}
                  </h1>
                ) : (
                  <img
                    src={`${IMAGE_BASE_URL}/w780${
                      data.custom_logo ? data.custom_logo : logo
                    }`}
                    alt={data.title || data.name}
                    className=" w-full lg:max-h-60 max-h-30 object-contain object-left"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={false}
            animate={{
              height: playing ? "0" : "auto",
            }}
            transition={{
              delay: 0.5,
              duration: 0.3,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="flex items-center lg:gap-6 gap-3 lg:mb-8 mb-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="lg:text-2xl text-lg font-semibold  ">
                      {data.vote_average.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">/ 10</div>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div className="text-muted-foreground">
                    {new Date(
                      data.release_date || data.first_air_date,
                    ).getFullYear()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="text-muted-foreground leading-relaxed lg:mb-10 mb-5 lg:line-clamp-4 line-clamp-2 lg:text-lg text-sm"
                >
                  {data.overview}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="flex lg:gap-4 gap-2 items-center"
              >
                <Button
                  asChild
                  size="xl"
                  variant="accent"
                  className="active:scale-95"
                >
                  <Link
                    href={`/details/${data.media_type}/${data.id}`}
                    scroll={false}
                    prefetch={false}
                  >
                    <Play className=" fill-current" /> Play Now
                  </Link>
                </Button>
                <WatchlistButton movie={data} />
                {!trailerError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className=""
                  >
                    <span
                      className="active:scale-95"
                      onClick={() => setPlaying((p) => !p)}
                    >
                      {playing ? (
                        <IconVideoOff className="size-8" />
                      ) : (
                        <IconVideoFilled className="size-8" />
                      )}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {!trailerError && playing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.2,
            ease: "easeOut",
          }}
          className="absolute bottom-25 right-0 flex gap-4 bg-black/50 pl-4 py-2 border-l-2 border-red-500 pr-8"
        >
          <span className="active:scale-95" onClick={() => setMuted((m) => !m)}>
            {muted ? (
              <Volume className="size-8" />
            ) : (
              <Volume2 className="size-8" />
            )}
          </span>
        </motion.div>
      )}
      {/*IMAGE */}
      {/* <span className="absolute bottom-10 left-1/2 z-10 h-9 w-6 -translate-x-1/2 rounded-full border border-foreground/80 flex items-start justify-center pt-1 animate-bounce opacity-80 shadow-md">
        <span className="h-2.5 w-px bg-foreground  border-foreground/80 rounded-full"></span>
      </span> */}
    </motion.div>
  );
}
