"use client";

import AddNewEmoji from "@/actions/AddNewEmoji";
import Button from "@/primatives/button";
import { ButtonText } from "@/primatives/typography";
import { EmojiSchema } from "@/validations/schema";
import { EmojiSchemaType } from "@/validations/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Details from "./details";
import Emoji from "./emoji";

export type EmojiSetupType = {
  hasNitro: boolean;
  step: number;
  emojiURL: string;
  prevStep: number;
};

export type LinkType = {
  withUsername: boolean;
  value: string;
};

export default function Client({ isNew }: { isNew: boolean }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState({
    withUsername: true,
    value: "",
  });

  const [emojiSetup, setEmojiSetup] = useState<EmojiSetupType>({
    hasNitro: false,
    prevStep: 1,
    step: 1,
    emojiURL: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full h-full flex flex-col xl:flex-row items-start bg-palette-bg shadow-neo-brutalist border-black p-4 rounded-neo-brutalist border-neo-brutalist justify-start gap-10">
        <Details name={name} setName={setName} link={link} setLink={setLink} />
        <Emoji
          emojiSetup={emojiSetup}
          setEmojiSetup={setEmojiSetup}
          isNew={isNew}
        />
      </div>
      <Button
        disabled={
          name.length === 0 ||
          link.value.length === 0 ||
          emojiSetup.emojiURL.length === 0
        }
        className="mt-4"
        onClick={async () => {
          if (
            name.length === 0 ||
            link.value.length === 0 ||
            emojiSetup.emojiURL.length === 0
          )
            return;
          setLoading(true);
          const emoji: EmojiSchemaType = {
            displayName: name,
            emoji: emojiSetup.emojiURL,
            url: link.value,
            prefixed: link.withUsername,
          };

          const parsedEmoji = EmojiSchema.safeParse(emoji);

          if (!parsedEmoji.success) {
            console.log(emoji);
            toast.error(await JSON.parse(parsedEmoji.error.message)[0].message);
            setLoading(false);
            return;
          }

          const res = await AddNewEmoji({
            displayName: name,
            emoji: emojiSetup.emojiURL,
            prefixed: link.withUsername,
            url: link.value,
          });
          router.prefetch("/dashboard");
          if (res.type === "error") toast.error(res.message);
          else toast.success(res.message);
          setLoading(false);
          router.push("/dashboard");
        }}
      >
        <ButtonText className="text-palette-text xl:text-[30px] text-[15px]">
          {" "}
          Create Emoji{" "}
          {loading && (
            <Loader2 className="animate-spin inline xl:size-[30px] size-[15px]" />
          )}
        </ButtonText>
      </Button>
    </div>
  );
}
