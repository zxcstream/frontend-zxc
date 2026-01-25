import { Button } from "@/components/ui/button";
import { Level } from "hls.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconAntennaBars1,
  IconAntennaBars2,
  IconAntennaBars3,
  IconAntennaBars5,
  IconAntennaBarsOff,
  IconCloudFilled,
} from "@tabler/icons-react";

import { useState } from "react";

import { ServerTypes } from "./hooks/useServerManager";

type Props = {
  setServer: (server: number) => void;
  server: number;
  servers: ServerTypes[];
  lockTimer: () => void;
  resetTimer: () => void;
  serverIndex: number;
};

export default function PlayerServer({
  setServer,
  servers,
  server,
  serverIndex,
  lockTimer,
  resetTimer,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      resetTimer();
    } else {
      lockTimer();
    }
  };

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        e.stopPropagation();
        if (e.pointerType === "mouse") {
          lockTimer();
        }
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        onPointerMove={lockTimer}
        onClick={handleButtonClick}
        className=" relative text-gray-200"
      >
        <IconCloudFilled className="lg:size-10 size-8" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute top-full right-0  mb-3 z-50 min-w-45 bg-card/80 backdrop-blur-2xl rounded-md overflow-hidden"
          >
            {/* Subtitle List */}

            <div>
              <h1 className="px-3 py-2 text-sm font-medium bg-background">
                Select Server
              </h1>

              <div className="custom-scrollbar max-h-[50dvh] overflow-auto pb-2 pt-1">
                {servers.map((s, i) => (
                  <Button
                    key={i}
                    onClick={() => {
                      setServer(i);
                      setOpen(false);
                    }}
                    variant={s.server === server ? "outline" : "ghost"}
                    className={`justify-between w-full rounded-none ${
                      i === serverIndex ? "pointer-events-none" : ""
                    }`}
                  >
                    <p>{s.name}</p>{" "}
                    <span>
                      {s.status === "queue" ? (
                        <IconAntennaBars1 className="text-gray-200" />
                      ) : s.status === "cancelled" ? (
                        <IconAntennaBars3 />
                      ) : s.status === "failed" ? (
                        <IconAntennaBarsOff className="text-red-800" />
                      ) : s.status === "available" ? (
                        <IconAntennaBars5 className="text-green-700" />
                      ) : s.status === "checking" ? (
                        <IconAntennaBars2 />
                      ) : (
                        ""
                      )}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Main Menu */}
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div className="fixed inset-0 z-30 " onClick={handleButtonClick} />
      )}
    </div>
  );
}
