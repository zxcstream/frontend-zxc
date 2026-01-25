// components/WatchlistButton.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Film, Trash, Tv } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  IconBookmarkMinus,
  IconFilter2Bolt,
  IconGhost2Filled,
  IconTrash,
  IconTrashFilled,
  IconTrashX,
  IconTrashXFilled,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useVideoProgressStore } from "@/store-player/videoProgressStore";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { Slider } from "@/components/ui/slider";
export default function History() {
  const progressList = Object.values(
    useVideoProgressStore((state) => state.progress),
  ).sort((a, b) => b.lastUpdated - a.lastUpdated);
  const [clear, setClear] = useState(false);
  const clearProgress = useVideoProgressStore((state) => state.clearProgress);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="lg:w-[85%] py-25  w-[95%]   mx-auto">
      <div className="fixed lg:bottom-10 bottom-18 lg:right-10 right-4">
        <Button
          size="xl"
          variant="destructive"
          className="rounded-full lg:size-13 size-11"
          onClick={() => setClear((prev) => !prev)}
        >
          {clear ? (
            <IconX className="size-6" />
          ) : (
            <IconTrashFilled className="size-6" />
          )}
        </Button>
      </div>
      {progressList.length === 0 ? (
        <div className="flex flex-col items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full p-4">
          <span>
            <IconGhost2Filled className="size-10 animate-bounce" />
          </span>
          <h3 className="lg:text-2xl text-center font-bold mb-2 mt-3 bg-linear-to-t from-zinc-500 to-white bg-clip-text text-transparent">
            Your History is empty
          </h3>

          <p className="text-sm text-muted-foreground text-center">
            Add your favorite show to easily find and watch them later.
          </p>
          <Button size="lg" asChild className="mt-6" variant="outline">
            <Link href="/">
              Home <ArrowRight />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className=" uppercase  mask-[linear-gradient(to_bottom,black_0%,transparent_85%)] lg:text-6xl text-5xl font-bold text-red-700  translate-y-3 tracking-tight ">
            HISTORY
          </h1>
          <div className="grid gap-3 lg:grid-cols-5 grid-cols-2">
            {progressList.map((meow, idx) => {
              const key =
                meow.media_type === "movie"
                  ? `movie-${meow.id}`
                  : `tv-${meow.id}-s${meow.season}-e${meow.episode}`;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: idx * 0.03,
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative group overflow-hidden rounded-md active:scale-98"
                >
                  <Link
                    href={`/watch/${meow.media_type}/${meow.id}${meow.media_type === "tv" ? `/${meow.season}/${meow.episode}` : ""}`}
                  >
                    <div className="relative  p-px rounded-md bg-linear-to-b group-hover:to-red-800 from-transparent   transition duration-150 overflow-hidden">
                      <div className="aspect-video   rounded-md  transition cursor-pointer overflow-hidden relative ">
                        <img
                          src={`${IMAGE_BASE_URL}/w780${meow.backdrop}`}
                          alt={meow.title}
                          className={`w-full h-full object-cover transition-opacity duration-300  ${loaded ? "opacity-100 " : "opacity-0"}`}
                          onLoad={() => setLoaded(true)}
                        />

                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/50 opacity-0 group-hover:opacity-100 transition duration-150"></div>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      <Slider
                        value={[meow.currentTime]}
                        max={meow.duration}
                        step={1}
                        className="mx-auto w-full max-w-xs
             **:data-[slot=slider-thumb]:opacity-0
             **:data-[slot=slider-thumb]:pointer-events-none"
                      />
                      <h1 className="lg:text-sm text-xs  font-normal truncate">
                        {meow.title}{" "}
                        {meow.media_type === "tv"
                          ? `(S${meow.season}E${meow.episode})`
                          : ""}
                      </h1>
                      {/* <p className="text-xs text-muted-foreground">{movie.}</p> */}
                    </div>
                  </Link>{" "}
                  <AlertDialog>
                    <AnimatePresence>
                      {clear && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-0 right-0"
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              className=" backdrop-blur-2xl cursor-pointer rounded-none rounded-bl-lg"
                              variant="destructive"
                            >
                              <IconTrashFilled className="size-5" />
                            </Button>
                          </AlertDialogTrigger>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete {meow.title}{" "}
                          {meow.media_type === "tv"
                            ? `S${meow.season}E${meow.episode}`
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
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
