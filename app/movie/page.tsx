"use client";
import { AnimatePresence, motion } from "motion/react";
import DiscoverMovie from "./movie";
import { useSearchParams } from "next/navigation";
import SearchResult from "../search-components/search-results";
import LandingPage from "../landing-components/landing-page";
import { useMemo } from "react";
import { shuffleArray } from "@/lib/shuffle";
import ReusableSection from "../reusable-section";

export default function Movies() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const isSearching = Boolean(query);
  const custom_list = useMemo(() => {
    return shuffleArray([
      {
        id: 1087192,
        media_type: "movie",
        custom_image: "/ePBpmoO0OVOFBarWU2bPTAsuifA.jpg",
        custom_logo: "",
      },
      {
        id: 254,
        media_type: "movie",
        custom_image: "/mRM2NB0i3wv4HqxXvwIjEVi4Qqq.jpg",
        custom_logo: "/uMKtUKhoZwXi9GcCgIvesOoGrej.png",
      },
      {
        id: 493922,
        media_type: "movie",
        custom_image: "/3YoLQIF9ZImadhwawnzQ20ElRe9.jpg",
        custom_logo: "",
      },
      {
        id: 991494,
        media_type: "movie",
        custom_image: "/pbrkL804c8yAv3zBZR4QPEafpAR.jpg",
        custom_logo: "/8G6W14aWn2jCYUADgXXwepN5tgv.png",
      },
    ]);
  }, []);
  return (
    <>
      <LandingPage custom_list={custom_list} />
      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.2,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.1,
                ease: "easeInOut",
              },
            }}
          >
            <SearchResult />
          </motion.div>
        ) : (
          <ReusableSection media_type="movie" />
        )}
      </AnimatePresence>
    </>
  );
}
