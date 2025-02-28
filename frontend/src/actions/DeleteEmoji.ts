"use server";

import initPocketbase from "@/lib/initPocketbase";
import { EmojiSchemaType } from "@/validations/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";

export default async function DeleteEmoji({
  emojiID,
  emoji,
}: {
  emojiID: string;
  emoji: EmojiSchemaType;
}) {
  const pb = await initPocketbase();
  const token = cookies().get("token");
  if (!token) redirect("/auth");
  pb.authStore.save(token.value);
  await pb.collection("users").authRefresh();

  try {
    await pb.collection("emojis").delete(emojiID);
    revalidatePath("/dashboard");
    if (emoji.prefixed)
      revalidatePath(`${pb.authStore.model!.username}/${emoji.url}`);
    else revalidatePath(`/${emoji.url}`);
    return {
      type: "success",
      message: "Emoji added successfully",
    };
  } catch (error) {
    if (error instanceof ClientResponseError)
      return {
        type: "error",
        message: error.message,
      };
    else {
      console.error(error);
      return {
        type: "error",
        message: "An error occurred",
      };
    }
  }
}
