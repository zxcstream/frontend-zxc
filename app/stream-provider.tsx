import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { motion } from "motion/react";
import { swiperConfigCompany } from "@/lib/swiper-config-backdrop";
import { useState } from "react";
import { COMPANIES } from "@/constants/movie-endpoints";
import Link from "next/link";

export default function StreamProviders() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className=" mx-auto lg:w-[85%] w-[95%]  relative lg:pb-15 pb-8  border-b">
      <Swiper {...swiperConfigCompany}>
        {COMPANIES.map((company, i) => (
          <SwiperSlide key={company.id} className="p-1">
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
              <Link href={`/browse/${company.id}`}>
                <div className="relative   bg-linear-to-b  rounded-sm">
                  <div className="aspect-video    transition cursor-pointer relative  rounded-sm overflow-hidden ">
                    {company.logo && (
                      <img
                        src={company.logo.src}
                        alt={company.displayName}
                        className={`w-full h-full object-contain transition-opacity duration-300  ${loaded ? "opacity-100 " : "opacity-0"} ${company.invert ? "filter invert" : ""}`}
                        onLoad={() => setLoaded(true)}
                      />
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
