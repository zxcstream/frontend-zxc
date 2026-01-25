import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hook/use-mobile";
import { motion } from "framer-motion";
export default function SkeletonLanding({
  isSearching,
}: {
  isSearching: boolean;
}) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={false}
      animate={{
        height: isSearching ? 0 : isMobile ? "60vh" : "100vh",
        opacity: isSearching ? 0 : 1,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative overflow-hidden"
    >
      <div className="absolute w-[85%]  lg:bottom-25 bottom-5 bg-amber-80 -translate-x-1/2 left-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[38%] w-2xl space-y-6"
        >
          {/* Genre Badge */}
          <div className="inline-block">
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-12 w-4/5 rounded-lg" />
          </div>

          {/* Rating + Date */}
          <div className="flex items-center gap-6">
            <Skeleton className="h-10 w-20 rounded-lg" />
            <div className="h-8 w-px bg-white/10" />
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-3/4 rounded-lg" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
