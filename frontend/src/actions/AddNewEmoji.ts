"use server";

import initPocketbase from "@/lib/initPocketbase";
import { EmojiSchema } from "@/validations/schema";
import { EmojiSchemaType } from "@/validations/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sharp from "sharp";

export default async function AddNewEmoji({
  displayName,
  prefixed,
  url,
  emoji,
}: {
  displayName: string;
  prefixed: boolean;
  url: string;
  emoji: string;
}) {
  const pb = await initPocketbase();
  const token = cookies().get("token");
  if (!token) redirect("/auth");
  pb.authStore.save(token.value);
  await pb.collection("users").authRefresh();

  const testEmoji: EmojiSchemaType = {
    displayName: displayName,
    emoji: emoji,
    url: url,
    prefixed: prefixed,
  };
  const parsedEmoji = EmojiSchema.safeParse(testEmoji);

  if (!parsedEmoji.success) {
    console.log(parsedEmoji.error.message);
    return {
      type: "error",
      message: await JSON.parse(parsedEmoji.error.message)[0].message,
    };
  }

  try {
    if (prefixed) {
      const res = await pb
        .collection("emojis")
        .getFirstListItem(
          `url="${url}" && owner="${pb.authStore.model!.id}" && prefixed=true`
        );
      console.log(res);
    } else
      await pb
        .collection("emojis")
        .getFirstListItem(
          `url="${url}" && owner="${
            pb.authStore.model!.id
          }" && prefixed="false"`
        );
    return {
      type: "error",
      message: "Display Name already taken",
    };
  } catch (e) {
    const file = new FormData();

    const buffer = await fetch(emoji).then((res) => res.arrayBuffer());
    const resizedImage = await sharp(buffer)
      .resize(100, 100, { fit: "contain" })
      .sharpen({
        sigma: 0.5,
        m1: 0.5,
        m2: 0.5,
        x1: 1.0,
        y2: 5.0,
        y3: 10.0,
      })
      .webp({ quality: 100, lossless: true, force: true })
      .toBuffer();
    const resizedImageBlob = new Blob([resizedImage], { type: "image/webp" });

    const image = new File([resizedImageBlob], `${url}.webp`, {
      type: "image/webp",
    });
    file.append("emoji", image);
    file.append("displayName", displayName);
    file.append("prefixed", prefixed.toString());
    file.append("url", url);
    file.append("owner", pb.authStore.model!.id);

    await pb.collection("emojis").create(file);
    revalidatePath("/dashboard");
    return {
      type: "success",
      message: "Emoji added successfully",
    };
  }
}
