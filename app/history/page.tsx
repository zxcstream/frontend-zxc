"use client";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import SearchResult from "../search-components/search-results";
import History from "./history";

export default function HistoryPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const isSearching = Boolean(query);

  return (
    <AnimatePresence mode="wait">
      {isSearching ? (
        <motion.div
          key="search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.1,
            ease: "easeInOut",
          }}
        >
          <SearchResult />
        </motion.div>
      ) : (
        <History />
      )}
    </AnimatePresence>
  );
}
