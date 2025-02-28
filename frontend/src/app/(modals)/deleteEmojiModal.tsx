"use client";
import DeleteEmoji from "@/actions/DeleteEmoji";
import { H2 } from "@/primatives/typography";
import useAnimate from "@/utils/useAnimate";
import { EmojiSchemaType } from "@/validations/types";
import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteEmojiModal({
  emojiID,
  emojiDetails,
  Animate,
}: {
  emojiID: string;
  emojiDetails: EmojiSchemaType;
  Animate: ReturnType<typeof useAnimate>;
}) {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const closeOpenMenus = (e: any) => {
    if (
      containerRef.current &&
      Animate.showComponent &&
      !containerRef.current.contains(e.target)
    ) {
      Animate.setQueue(false);
    }
  };
  useEffect(() => {
    if (Animate.showComponent) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    document.addEventListener("mousedown", closeOpenMenus);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Animate.showComponent]);

  return (
    Animate.actualState && (
      <div
        className={`${
          Animate.showComponent ? "opacity-100 " : " opacity-0 "
        } w-full h-[100svh]  transition-all duration-700 ease-in-out fixed top-0  z-[1500] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md`}
      >
        <div
          ref={containerRef}
          className="w-[90%] max-w-[1280px] xl:w-[60%] md:h-[80%] h-[50%] flex flex-col items-center justify-center xl:h-[300px] bg-palette-primary overflow-hidden border-neo-brutalist border-black rounded-neo-brutalist  shadow-neo-brutalist"
        >
          <button
            aria-label="Close Modal"
            onClick={() => {
              Animate.setQueue(false);
            }}
            className="absolute top-12 md:top-8 right-8"
          >
            <X size={30} className="text-shades-white"></X>
          </button>

          <H2 className="text-palette-text font-bold w-full text-center px-2 truncate min-w-0">
            DELETING {emojiDetails.displayName}
          </H2>

          <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-center gap-5 pb-2">
            <button
              onClick={async () => {
                Animate.setQueue(false);
                setLoading(true);
                const res = await DeleteEmoji({
                  emojiID,
                  emoji: emojiDetails,
                });
                if (res.type === "error") {
                  toast.error(res.message);
                } else {
                  toast.success(res.message);
                }
                setLoading(false);
                Animate.setQueue(false);
                return;
              }}
              className="flex flex-row uppercase gap-2 w-full  md:w-[150px]   bg-red-400 border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover scale-95 will-change-transform transition-all ease-in-out duration-300 items-center justify-center  px-[1rem] h-[50px] text-palette-text font-bold text-[14px]"
            >
              {loading ? (
                <Loader2 strokeWidth={3} className=" animate-spin" />
              ) : (
                <p>DELETE EMOJI</p>
              )}
            </button>
            <button
              onClick={() => {
                Animate.setQueue(false);
              }}
              className="flex flex-row uppercase gap-2 w-full  md:w-[150px]   bg-palette-accent border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover scale-95 will-change-transform transition-all ease-in-out duration-300 items-center justify-center  px-[1rem] h-[50px] text-palette-text font-bold text-[14px]"
            >
              <p>BACK</p>{" "}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
