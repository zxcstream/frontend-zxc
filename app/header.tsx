"use client";
import logo from "@/assets/zxczxc.svg";
import { Fade as Hamburger } from "hamburger-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import netflix from "@/assets/netflix.jpg";
import {
  IconBookmark,
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandTelegram,
  IconDownload,
  IconLogin,
  IconPackages,
  IconSettings2,
} from "@tabler/icons-react";
import { GalleryVerticalEnd } from "lucide-react";
import SearchModal from "./search-components/search-modal";
import ChangeLogs from "./changelogs";
import Link from "next/link";
import InstallButton from "@/components/ui/install";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed w-full  z-20 transition-all duration-300 ${
        scrolled
          ? "bg-background backdrop-blur-lg pt-3 pb-3"
          : "bg-transparent lg:pt-8 pt-3 pb-3"
      }`}
    >
      <div className=" lg:w-[85%] w-[95%] flex justify-between items-center mx-auto">
        <div className="flex items-center lg:gap-2 gap-1"></div>
      </div>
    </header>
  );
}
