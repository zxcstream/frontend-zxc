import { Navigation, Pagination, Keyboard, Scrollbar } from "swiper/modules";

export const swiperConfigBackdrop = {
  spaceBetween: 20,
  navigation: true,
  keyboard: { enabled: true },
  scrollbar: { el: ".swiper-scrollbar", hide: false },
  modules: [Navigation, Pagination, Keyboard, Scrollbar],
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      slidesPerGroup: 2,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20,
    },
    1140: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20,
    },
  },
};

export const swiperModalConfig = {
  spaceBetween: 20,
  navigation: true,
  keyboard: { enabled: true },
  scrollbar: { el: ".swiper-scrollbar", hide: false },
  modules: [Navigation, Pagination, Keyboard, Scrollbar],
  breakpoints: {
    0: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 3,
    },
    768: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 5,
    },
    1024: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 10,
    },
    1140: {
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: 10,
    },
  },
};
export const swiperConfigCompany = {
  spaceBetween: 20,
  navigation: true,
  keyboard: { enabled: true },
  scrollbar: { el: ".swiper-scrollbar", hide: false },
  modules: [Navigation, Pagination, Keyboard, Scrollbar],
  breakpoints: {
    0: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20,
    },
    1140: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 8,
      slidesPerGroup: 8,
      spaceBetween: 60,
    },
  },
};
