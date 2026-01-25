import { useEffect, useState } from "react";

export function usePictureInPicture({
  videoRef,
  isLoading,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isLoading: boolean;
}) {
  const [isPiP, setIsPiP] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnterPiP = () => setIsPiP(true);
    const onLeavePiP = () => setIsPiP(false);

    video.addEventListener("enterpictureinpicture", onEnterPiP);
    video.addEventListener("leavepictureinpicture", onLeavePiP);

    return () => {
      video.removeEventListener("enterpictureinpicture", onEnterPiP);
      video.removeEventListener("leavepictureinpicture", onLeavePiP);
    };
  }, [isLoading]);

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        // Exit PiP
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        // Enter PiP
        await video.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch (err) {
      console.error("PiP failed:", err);
    }
  };

  return { isPiP, togglePiP };
}
