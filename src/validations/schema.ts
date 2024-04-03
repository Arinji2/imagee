import { z } from "zod";
import { DISCORD_EMOJI_REGEX } from "./regex";

export const EmojiSchema = z
  .object({
    displayName: z.string().min(1),
    url: z.string().min(1),
    emoji: z
      .string()
      .min(2)
      .refine((val) => DISCORD_EMOJI_REGEX.test(val), {
        message:
          "Invalid emoji URL, please copy the url sent by our discord bot.",
      })
      .transform((val) => {
        const newVal = val.split("?")[0];
        const url = new URL(newVal);
        url.searchParams.set("size", "160");
        url.searchParams.set("quality", "lossless");
        return url.toString();
      }),
    prefixed: z.boolean(),
  })
  .refine((val) => !val.url.includes("/"), {
    message: "URL must not contain '/'",
  })
  .refine(
    (val) => {
      if (!val.prefixed) return true; // If not prefixed, it passes the validation
      return val.url.length > 3; // If prefixed, check length of URL
    },
    {
      message: "URL must be at least 3 characters long if without username",
    }
  );
