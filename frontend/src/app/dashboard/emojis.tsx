"use client";

import { H4 } from "@/primatives/typography";
import useAnimate from "@/utils/useAnimate";
import { EmojiSchemaType } from "@/validations/types";
import autoAnimate from "@formkit/auto-animate";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import DeleteEmojiModal from "../(modals)/deleteEmojiModal";

type SelectedEmojiType = {
  id: string;
  emoji: EmojiSchemaType;
};

export function Emojis({
  emojis,
  username,
}: {
  emojis: (EmojiSchemaType & { id: string })[];
  username: string;
}) {
  const parent = useRef(null);
  const Animate = useAnimate(800);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<SelectedEmojiType>({
    id: "",
    emoji: {
      displayName: "",
      emoji: "",
      url: "",
      prefixed: false,
    },
  });

  useEffect(() => {
    setDocumentLoaded(true);
  }, [documentLoaded]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  return (
    <div
      ref={parent}
      className="w-full h-fit flex flex-row items-center justify-between flex-wrap gap-4"
    >
      {documentLoaded &&
        createPortal(
          <DeleteEmojiModal
            Animate={Animate}
            emojiID={selectedEmoji!.id}
            emojiDetails={selectedEmoji.emoji}
          />,
          document.body
        )}

      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="w-full md:w-[300px] h-fit flex flex-col items-center justify-start bg-palette-bg rounded-neo-brutalist border-neo-brutalist hover:shadow-neo-brutalist-hover transition-shadow ease-in-out duration-300 shadow-neo-brutalist shadow-black border-black"
        >
          <div className="w-full h-[90px]  flex flex-row items-end gap-2  justify-center bg-palette-secondary">
            <div className="w-[50%] max-w-[90px]  h-full flex flex-col items-center justify-center relative">
              <Image
                src={`https://db-imagee.arinji.com/api/files/emojis/${emoji.id}/${emoji.emoji}`}
                width={70}
                height={70}
                alt={emoji.displayName}
                className="absolute bottom-0"
              />
            </div>
            <div className="w-full h-full flex flex-col  items-start justify-start">
              <H4 className="line-clamp-2   font-bold text-palette-text px-2">
                {emoji.displayName}
              </H4>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 py-3 justify-start px-2 w-full h-fit">
            <div className="flex flex-row items-center justify-start gap-2 ">
              <H4 className="text-palette-text font-bold">Prefixed:</H4>
              {emoji.prefixed ? (
                <CheckCircle2
                  size={30}
                  className="text-green-500"
                ></CheckCircle2>
              ) : (
                <XCircle size={30} className="text-red-500"></XCircle>
              )}
            </div>
            <button
              onClick={() => {
                const domain = window.location.origin;

                navigator.clipboard.writeText(
                  `${domain}/${
                    emoji.prefixed ? `${username}/${emoji.url}` : emoji.url
                  }`
                );
                toast.success("Copied URL to clipboard");
              }}
              className="w-full h-[40px] shadow-neo-brutalist-hover hover:scale-95 transition-transform ease-in-out duration-150 will-change-transform border-neo-brutalist border-black rounded-neo-brutalist bg-palette-accent flex flex-col items-center justify-center"
            >
              <p className="text-palette-text font-bold text-[15px]">
                Copy URL
              </p>
            </button>
            <button
              onClick={() => {
                setSelectedEmoji({ id: emoji.id, emoji });
                Animate.setQueue(true);
              }}
              className="w-full h-[40px] shadow-neo-brutalist-hover border-neo-brutalist hover:scale-95 transition-transform ease-in-out duration-150 will-change-transform border-black rounded-neo-brutalist bg-red-400 flex flex-col items-center justify-center"
            >
              <p className="text-palette-text font-bold text-[15px]">
                Delete Emoji
              </p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
