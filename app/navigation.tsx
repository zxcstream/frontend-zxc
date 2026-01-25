import {
  Bookmark,
  Download,
  Film,
  GalleryVertical,
  GalleryVerticalEnd,
  House,
  Search,
  Settings,
  Tv,
} from "lucide-react";
import Link from "next/link";
import logo from "@/assets/zxczxc.svg";
import { usePathname } from "next/navigation";
import { IconDeviceDesktopDown, IconDeviceIpadDown } from "@tabler/icons-react";

export default function Navigation({
  setSearch,
  search,
}: {
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  search: boolean
}) {
  const pathname = usePathname();
  return (
    <div className="fixed lg:inset-y-0 lg:inset-x-auto   inset-x-0 flex justify-center items-center lg:p-10 p-3 z-40  bottom-0 bg-background lg:bg-transparent">
      <div className="absolute top-12 size-10 hidden lg:block">
        <img className="h-full w-full" src={logo.src} alt="" />
      </div>
      <div className="flex lg:flex-col lg:gap-10 items-center justify-center gap-8  w-full">
        <button>
          <Link href={`/`}>
            <House className="lg:size-6.5 size-6 " strokeWidth={1.8} />
          </Link>
          <div
            className={`h-[2.5px] rounded-full group-hover:bg-border  w-full mt-1.5 ${pathname === "/" && "bg-red-600"}`}
          ></div>
        </button>
        <button onClick={() => setSearch((prev) => !prev)}>
          <Search className="lg:size-6.5 size-6 " strokeWidth={1.8} />

          <div
            className={`h-[2.5px] rounded-full group-hover:bg-border  w-full mt-1.5 ${search && "bg-red-600"}`}
          ></div>
        </button>
        <button>
          <Link href={`/movie`}>
            <Film className="lg:size-6.5 size-6 " strokeWidth={1.8} />
          </Link>
          <div
            className={`h-[2.5px] rounded-full group-hover:bg-border  w-full mt-1.5 ${pathname === "/movie" && "bg-red-600"}`}
          ></div>
        </button>
        <button>
          <Link href={`/tv`}>
            <Tv className="lg:size-6.5 size-6 " strokeWidth={1.8} />
          </Link>
          <div
            className={`h-[2.5px] rounded-full group-hover:bg-border  w-full mt-1.5 ${pathname === "/tv" && "bg-red-600"}`}
          ></div>
        </button>
        <button>
          <Link href={`/history`}>
            <GalleryVerticalEnd
              className="lg:size-6.5 size-6 "
              strokeWidth={1.8}
            />
          </Link>
          <div
            className={`h-[2.5px] rounded-full group-hover:bg-border  w-full mt-1.5 ${pathname === "/history" && "bg-red-600"}`}
          ></div>
        </button>
        <button>
          <Link href={`/watchlist`}>
            <Bookmark className="lg:size-6.5 size-6 " strokeWidth={1.8} />
          </Link>
          <div
            className={`h-[2.5px] rounded-full group-hover:bg-border  w-full mt-1.5 ${pathname === "/watchlist" && "bg-red-600"}`}
          ></div>
        </button>
        <button>
          <Link href={`/settings`}>
            <Settings
              className="lg:size-6.5 size-6 hover:rotate-90 duration-500 transition"
              strokeWidth={1.8}
            />
          </Link>
          <div
            className={`h-[2.5px] rounded-full group-hover:bg-border  w-full mt-1.5 ${pathname === "/settings" && "bg-red-600"}`}
          ></div>
        </button>
      </div>
      <button className="absolute bottom-12 hidden lg:block">
        <Link href={`/install-pwa`}>
          <IconDeviceIpadDown
            className="lg:size-6.5 size-6  lg:hidden block"
            strokeWidth={1.8}
          />
          <IconDeviceDesktopDown
            className="lg:size-6.5 size-6  lg:block hidden"
            strokeWidth={1.8}
          />
        </Link>
        <div
          className={`h-[2.5px] rounded-full  w-full mt-1.5 ${pathname === "/install-pwa" && "bg-red-600"}`}
        ></div>
      </button>
    </div>
  );
}
