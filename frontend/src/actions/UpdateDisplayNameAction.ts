"use server";
import initPocketbase from "@/lib/initPocketbase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UpdateDisplayNameAction(displayName: string) {
  const pb = await initPocketbase();
  const token = cookies().get("token");
  if (!token) redirect("/auth");
  pb.authStore.save(token.value);
  await pb.collection("users").authRefresh();
  try {
    await pb
      .collection("users")
      .getFirstListItem(`displayName="${displayName}"`);
    return {
      type: "error",
      message: "Display Name already taken",
    };
  } catch (e) {
    const userData = await pb
      .collection("users")
      .getOne(pb.authStore.model!.id);
    await pb.collection("users").update(userData.id, {
      ...userData,
      displayName: displayName,
    });

    return {
      type: "success",
      message: "Display Name updated successfully",
    };
  }
}
