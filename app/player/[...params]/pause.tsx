import { MovieTypes } from "@/types/movie-by-id";
import { motion } from "framer-motion";

export default function Pause({ metadata }: { metadata: MovieTypes }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 z-10 overflow-hidden"
    >
      <div className="absolute left-[5%] -translate-x-[5%] lg:bottom-[10%] top-[50%] lg:top-[unset] lg:-translate-y-[10%] -translate-y-[50%] lg:max-w-3xl max-w-lg w-full p-4">
        <h3 className="lg:text-xl text-muted-foreground font-medium text-sm">
          You're watching
        </h3>
        <h1 className="lg:text-6xl text-3xl font-bold text-white mt-1">
          {metadata.name || metadata.title}
        </h1>
        <h1 className="lg:text-xl font-semibold lg:mt-4 mt-2 italic">
          {metadata.tagline}
        </h1>

        <div className="lg:w-32 w-22 lg:h-0.5 h-px bg-red-600 mt-4"></div>
        <p className="lg:mt-8 mt-4 lg:text-xl text-sm  text-muted-foreground line-clamp-3">
          {metadata.overview}
        </p>
      </div>
      <div className="absolute lg:right-[5%] -translate-x-[5%] lg:bottom-[10%] bottom-0 right-0 lg:top-[unset] lg:-translate-y-[10%]  p-4 ">
        <h1 className="lg:text-xl ">Paused</h1>
      </div>
    </motion.div>
  );
}
