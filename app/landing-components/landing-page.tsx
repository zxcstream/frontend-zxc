"use client";
import { useReusableApi } from "@/api/tanstack-query";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  EffectFade,
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { useLandingSwiper } from "@/store/landing-swiper";
import { useSearchParams } from "next/navigation";
import SkeletonLanding from "./skeleton";
import LandingContent from "./content";
import { useEffect, useMemo, useRef } from "react";
import { shuffleArray } from "@/lib/shuffle";
import { CustomListItem } from "@/types/landing-types";
export default function LandingPage({
  custom_list,
}: {
  custom_list: CustomListItem[];
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const isSearching = Boolean(search);

  const { index, setIndex } = useLandingSwiper();

  const swiperRef = useRef<SwiperType | null>(null);
  const query = useReusableApi({
    custom_list,
    activeIndex: index,
    prefetchRange: 1,
  });
  // useEffect(() => {
  //   if (!swiperRef.current) return;

  //   if (isSearching) {
  //     swiperRef.current.autoplay.stop();
  //   } else {
  //     swiperRef.current.autoplay.start();
  //   }
  // }, [isSearching]);
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      // loop={true}
      // navigation={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        type: "progressbar",
      }}
      onSwiper={(s) => (swiperRef.current = s)}
      // autoplay={{
      //   delay: 20000,
      //   disableOnInteraction: false,
      // }}
      modules={[EffectFade, Navigation, Pagination, Keyboard, Autoplay]}
      initialSlide={index}
      // onSlideChange={(s) => setIndex(s.activeIndex)}
      onSlideChange={(s) => {
        // IMPORTANT: use realIndex when loop is enabled
        setIndex(s.realIndex);
      }}
    >
      {query.map((meow, idx) =>
        meow.isLoading || !meow.data ? (
          <SwiperSlide key={`skeleton-${idx}`}>
            <SkeletonLanding isSearching={isSearching} />
          </SwiperSlide>
        ) : (
          <SwiperSlide key={meow.data.id}>
            {({ isActive }) => (
              <LandingContent
                isSearching={isSearching}
                isActive={isActive}
                data={meow.data}
              />
            )}
          </SwiperSlide>
        ),
      )}
    </Swiper>
  );
}

//  <Swiper
//    spaceBetween={30}
//    effect={"fade"}
//    // loop={true}
//    // navigation={true}
//    keyboard={{
//      enabled: true,
//    }}
//    pagination={{
//      type: "progressbar",
//    }}
//    onSwiper={(s) => (swiperRef.current = s)}
//    autoplay={{
//      delay: 20000,
//      disableOnInteraction: false,
//    }}
//    modules={[EffectFade, Navigation, Pagination, Keyboard, Autoplay]}
//    initialSlide={index}
//    // onSlideChange={(s) => setIndex(s.activeIndex)}
//    onSlideChange={(s) => {
//      // IMPORTANT: use realIndex when loop is enabled
//      setIndex(s.realIndex);
//    }}
//  >
//    {query.map((meow, idx) => {
//      const data = meow.data;
//      const loading = meow.isLoading;
//      if (!data || loading) {
//        return (
//          <SwiperSlide key={`skeleton-${idx}`}>
//            <SkeletonLanding isSearching={isSearching} />
//          </SwiperSlide>
//        );
//      }
//      return (
//        <SwiperSlide>
//          {({ isActive }) => (
//            <LandingContent
//              isSearching={isSearching}
//              isActive={isActive}
//              data={data}
//            />
//          )}
//        </SwiperSlide>
//      );
//    })}
//  </Swiper>;
